import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDTO } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  private async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          // should be config module
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          // should be config module
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hash = await this.hashData(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: hash,
      },
    });
  }

  public async signupLocal(signUpDto: SignUpDTO) {
    const hashedPassword = await this.hashData(signUpDto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: signUpDto.email,
        password: hashedPassword,
        name: signUpDto.name,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateRefreshToken(newUser.id, tokens.refresh_token);

    return {
      ...newUser,
      ...tokens,
    };
  }

  public signinLocal() {}

  public logout() {}

  public refreshToken() {}
}
