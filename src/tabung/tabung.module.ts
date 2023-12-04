import { Module } from '@nestjs/common';
import { TabungService } from './tabung.service';
import { TabungController } from './tabung.controller';
import { CartRepository } from './repository/cart.repository';
import { SampahRepository } from 'src/admin/repository/sampah.repository';
import { TransactionRepository } from './repository/transaction.repository';
import { ItemRepository } from './repository/item.repository';

@Module({
  providers: [TabungService, CartRepository, SampahRepository, TransactionRepository, ItemRepository],
  controllers: [TabungController],
})
export class TabungModule {}
