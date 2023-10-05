import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Sampah } from '../entity/sampah.entity';
import { CreateSampahDto } from '../dto';

@Injectable()
export class SampahRepository extends Repository<Sampah> {
  constructor(private dataSource: DataSource) {
    super(Sampah, dataSource.createEntityManager());
  }

  async createSampah(dto: CreateSampahDto, pathFile: string): Promise<Sampah> {
    dto.image = pathFile;
    const sampah = this.create(dto);
    return await this.save(sampah);
  }

  async findSampah(barang_id: string): Promise<Sampah> {
    return await this.findOneBy({ barang_id });
  }

  async findALlSampah(): Promise<Sampah[]> {
    return await this.find({});
  }

  async deleteSampah(barang_id: string) {
    await this.delete({ barang_id });
  }

  async editSampah(barang_id: string, dto: CreateSampahDto, pathFile: string) {
    const sampah = await this.findOneBy({ barang_id });
    if (!sampah) return false;
    sampah.name = dto.name;
    sampah.reward = dto.reward;
    sampah.image = pathFile;
    return await this.save(sampah);
  }
}
