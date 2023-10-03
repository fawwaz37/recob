import { Controller, Get, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard';
import { Admin } from './entity/admin.entity';
import { GetUser } from 'src/auth/decorator';
import { Response } from 'express';
import { IRequestFlash } from 'src/lib/flash.interface';
import { LocalAuthExceptionFilter } from 'src/auth/strategy';

@Controller('admin')
@UseFilters(LocalAuthExceptionFilter)
export class AdminController {
  @UseGuards(AuthenticatedGuard)
  @Get('/dashboard')
  secure(@GetUser('') admin: Admin, @Res() res: Response, @Req() req: IRequestFlash) {
    return res.render('dashboard/index', {
      layout: 'layouts/main',
    });
  }
}
