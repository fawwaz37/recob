import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SampahRepository } from '../repository/sampah.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSampahDto } from '../dto';
import * as path from 'path';
import { createWriteStream, unlink, unlinkSync } from 'fs';

@Injectable()
export class SampahService {
  constructor(@InjectRepository(SampahRepository) private sampahRepo: SampahRepository) {}

  async createSampah(dto: CreateSampahDto, file: Express.Multer.File) {
    const pathFile = `./public/image/sampah/${dto.name}${path.extname(file.originalname)}`;
    const ws = createWriteStream(pathFile);
    ws.write(file.buffer);
    const sampah = await this.sampahRepo.createSampah(dto, pathFile);
    return sampah;
  }

  async listSampah() {
    const list = await this.sampahRepo.findALlSampah();
    return list;
  }

  async deleteSampah(barang_id: string) {
    const sampah = this.sampahRepo.findSampah(barang_id);
    if (!sampah) return false;
    await this.sampahRepo.deleteSampah(barang_id);
    return true;
  }

  async editSampah(barang_id: string, dto: CreateSampahDto, file: Express.Multer.File) {
    const sampah = await this.sampahRepo.findSampah(barang_id);
    let pathFile: string;
    if (!sampah) return false;
    if (file) {
      pathFile = `./public/image/sampah/${dto.name}${path.extname(file.originalname)}`;
      unlink(sampah.image, (err) => {
        if (err) throw err;
        const ws = createWriteStream(pathFile);
        ws.write(file.buffer);
      });
    }

    await this.sampahRepo.editSampah(barang_id, dto, pathFile);
    return true;
  }
}
