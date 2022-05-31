import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDTO } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private async hashData(data: string) {
    return await bcrypt.hash(data, 10);
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
  }

  public signinLocal() {}

  public logout() {}

  public refreshToken() {}
}
