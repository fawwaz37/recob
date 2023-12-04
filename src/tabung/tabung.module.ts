import { Module } from '@nestjs/common';
import { TabungService } from './tabung.service';
import { TabungController } from './tabung.controller';
import { CartRepository } from './repository/cart.repository';
import { SampahRepository } from 'src/admin/repository/sampah.repository';

@Module({
  providers: [TabungService, CartRepository, SampahRepository],
  controllers: [TabungController],
})
export class TabungModule {}
