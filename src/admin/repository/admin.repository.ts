import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Admin } from '../entity/admin.entity';
import { CreateAdminDto } from 'src/auth/dto';

@Injectable()
export class AdminRepository extends Repository<Admin> {
  constructor(private dataSource: DataSource) {
    super(Admin, dataSource.createEntityManager());
  }

  async createAdmin(dto: CreateAdminDto) {
    const admin = this.create(dto);
    return this.save(admin);
  }

  async findAdmin(email: string): Promise<Admin> {
    return await this.findOneBy({ email });
  }
}
