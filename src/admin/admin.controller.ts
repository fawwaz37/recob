import { Controller, Get, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard';
import { Admin } from './entity/admin.entity';
import { GetUser } from 'src/auth/decorator';
import { Response } from 'express';
import { IRequestFlash } from 'src/lib/flash.interface';
import { LocalAuthExceptionFilter } from 'src/auth/strategy';

@Controller('admin')
@UseFilters(LocalAuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
export class AdminController {
  @Get('/dashboard')
  dashboard(@GetUser('') admin: Admin, @Res() res: Response, @Req() req: IRequestFlash) {
    return res.render('dashboard/index', {
      layout: 'layouts/main',
    });
  }

  @Get('/category')
  category(@Res() res: Response) {
    return res.render('dashboard/index', {
      layout: 'layouts/main',
    });
  }
}
