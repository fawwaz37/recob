import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SampahService } from './sampah.service';
import { CreateSampahDto } from '../dto';
import { IRequestFlash } from 'src/lib/flash.interface';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/auth/guard';
import { AdminExceptionFilter } from '../filters';

@Controller('admin/sampah')
@UseFilters(AdminExceptionFilter)
@UseGuards(AuthenticatedGuard)
export class SampahController {
  constructor(private sampahService: SampahService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createSampah(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateSampahDto,
    @Req() req: IRequestFlash,
    @Res() res: Response,
  ) {
    await this.sampahService.createSampah(dto, file);
    req.flash('success_msg', 'Sukses Membuat Kategori Sampah');
    return res.redirect('/admin/sampah/create');
  }

  @Get('/create')
  async getCreate(@Res() res: Response) {
    return res.render('dashboard/uploadsampah', {
      layout: 'layouts/main',
    });
  }

  @Get()
  async getSampah(@Req() req: IRequestFlash, @Res() res: Response) {
    const list = await this.sampahService.listSampah();
    const arrDate = list.map((item) => ({
      createdAt: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
        new Date(item.createdAt),
      ),
      updatedAt: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
        new Date(item.updatedAt),
      ),
    }));
    return res.render('dashboard/category', {
      list,
      arrDate,
      layout: 'layouts/main',
    });
  }

  @Put(':sampah')
  @UseInterceptors(FileInterceptor('image'))
  async editSampah(
    @Param('sampah') barang_id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateSampahDto,
  ) {
    await this.sampahService.editSampah(barang_id, dto, file);
    return { message: `Sukses Edit Kategori` };
  }

  @Delete(':sampah')
  async deleteSampah(@Param('sampah') barang_id: string) {
    const result = await this.sampahService.deleteSampah(barang_id);
    if (!result) return { statusCode: HttpStatus.NOT_FOUND, message: 'Sampah Not Found' };
    return { message: `Sukses Menghapus Kategori` };
  }
}
