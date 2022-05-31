import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  signupLocal(@Body() signUpDto: SignUpDTO) {
    return this.authService.signupLocal(signUpDto);
  }

  @Post('local/signin')
  signinLocal(@Body() signInDto: SignInDTO) {
    return this.authService.signinLocal(signInDto);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Post('refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
