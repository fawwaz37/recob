import { Module } from '@nestjs/common';
import { SampahService } from './sampah.service';
import { SampahController } from './sampah.controller';
import { SampahRepository } from '../repository/sampah.repository';

@Module({
  providers: [SampahService, SampahRepository],
  controllers: [SampahController],
})
export class SampahModule {}
