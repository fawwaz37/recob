import { Module } from '@nestjs/common';
import { TabungService } from './tabung.service';
import { TabungController } from './tabung.controller';

@Module({
  providers: [TabungService],
  controllers: [TabungController]
})
export class TabungModule {}
