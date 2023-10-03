import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { AdminRepository } from './repository/admin.repository';

@Module({
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
  imports: [TypeOrmModule.forFeature([Admin])],
})
export class AdminModule {}
