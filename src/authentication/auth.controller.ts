import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { GetCurrentUserRToken } from './decorators/current-user-rtoken.decorator';
import { GetCurrentUser } from './decorators/current-user.decorator';
import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  public async signupLocal(@Body() signUpDto: SignUpDTO) {
    return await this.authService.signupLocal(signUpDto);
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  public async signinLocal(@Body() signInDto: SignInDTO) {
    return await this.authService.signinLocal(signInDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@GetCurrentUser() userId: number) {
    return await this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  public async refreshToken(
    @GetCurrentUser() userId: number,
    @GetCurrentUserRToken('refreshToken') refreshToken: string,
  ) {
    return await this.authService.refreshToken(userId, refreshToken);
  }
}
