import { Body, Controller, Get, HttpCode, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthAdminService } from './auth.service';
import { CreateAdminDto } from 'src/auth/dto';
import { Response } from 'express';
import { IRequestFlash } from 'src/lib/flash.interface';
import { LocalAuthGuard } from '../guard';
import { LocalAuthExceptionFilter } from '../strategy';

@Controller('auth/admin')
@UseFilters(LocalAuthExceptionFilter)
export class AuthAdminController {
  constructor(private authService: AuthAdminService) {}

  @Get('signin')
  signInGet(@Res() res: Response, @Req() req: IRequestFlash) {
    return res.render('auth/login', {
      layout: 'auth/main',
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Res() res: Response, @Req() req: IRequestFlash) {
    req.flash('success_msg', 'Sukses Login Admin!');
    return res.redirect('/admin/dashboard');
  }

  @Get('signup')
  signUpGet(@Res() res: Response, @Req() req: IRequestFlash) {
    return res.render('auth/register', {
      layout: 'auth/main',
    });
  }

  @Post('signup')
  @HttpCode(200)
  async signUp(@Body() dto: CreateAdminDto, @Res() res: Response, @Req() req: IRequestFlash) {
    if (dto.password !== dto.passwordAgain) {
      req.flash('error_msg', 'Password Tidak Sama !');
      return res.redirect('/auth/admin/signup');
    }
    const result = await this.authService.signUpAdmin(dto);
    if (!result) {
      req.flash('error_msg', 'Something Wrong!');
      return res.redirect('/auth/admin/signup');
    }
    req.flash('success_msg', 'Sukses Register Silahkan Login!');
    return res.redirect('/auth/admin/signin');
  }
}
