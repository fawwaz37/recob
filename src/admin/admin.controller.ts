import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard';
import { Admin } from './entity/admin.entity';
import { GetUser } from 'src/auth/decorator';
import { Response } from 'express';
import { IRequestFlash } from 'src/lib/flash.interface';
import { LocalAuthExceptionFilter } from 'src/auth/strategy';
import { AdminService } from './admin.service';

@Controller('admin')
@UseFilters(LocalAuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/dashboard')
  dashboard(@GetUser('') admin: Admin, @Res() res: Response, @Req() req: IRequestFlash) {
    return res.render('dashboard/index', {
      layout: 'layouts/main',
    });
  }

  @Get('/apidoc')
  category(@Res() res: Response) {
    return res.render('dashboard/apidoc', {
      layout: 'layouts/main',
    });
  }

  @Get('/transaction')
  async transaction(@Res() res: Response) {
    const list = await this.adminService.getAllTransaction();
    const arrDate = list.map((item) => ({
      createdAt: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
        new Date(item.created_at),
      ),
    }));
    return res.render('dashboard/transaction', {
      layout: 'layouts/main',
      arrDate,
      list,
    });
  }

  @Post('/transaction')
  @HttpCode(200)
  async postStatusTransaction(@Body() body: { status: string; transaksi_id: number }) {
    const updateStatus = await this.adminService.acceptTransaction(body.transaksi_id, body.status);
    return { message: `Sukses Edit Status Transaksi`, transaction: updateStatus };
  }

  @Delete('/transaction/:id')
  async deleteSampah(@Param('id') transaksi_id: number) {
    const result = await this.adminService.deleteTransaction(+transaksi_id);
    if (!result) return { statusCode: HttpStatus.NOT_FOUND, message: 'Sampah Not Found' };
    return { message: `Sukses Menghapus Transaksi` };
  }
}
