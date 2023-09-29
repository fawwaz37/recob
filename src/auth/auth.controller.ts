import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignUserDto } from 'src/auth/dto';
import { ResetPassDto } from './dto/reset-pass.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(200)
  signUp(@Body() dto: CreateUserDto) {
    if (dto.password !== dto.passwordAgain) {
      throw new BadRequestException('Password Tidak Sama');
    }
    return this.authService.signUp(dto);
  }

  @Post('signin')
  @HttpCode(200)
  signIn(@Body() dto: SignUserDto) {
    return this.authService.signIn(dto);
  }

  @Post('forgotpassword')
  @HttpCode(200)
  forgotPassword(@Body() body: any) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('verificationcode')
  @HttpCode(200)
  verificationcode(@Body() body: { email: string; code: string }) {
    return this.authService.verificationCode(body);
  }

  @Put('resetpassword')
  @HttpCode(200)
  resetPassword(@Body() dto: ResetPassDto) {
    if (dto.password !== dto.passwordAgain) {
      throw new BadRequestException('Password Tidak Sama');
    }
    return this.authService.resetPassword(dto);
  }
}
