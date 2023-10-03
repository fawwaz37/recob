import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from 'src/admin/repository/admin.repository';
import { CreateAdminDto } from '../dto';

@Injectable()
export class AuthAdminService {
  constructor(@InjectRepository(AdminRepository) private adminRepo: AdminRepository) {}

  async signUpAdmin(dto: CreateAdminDto) {
    const admin = await this.adminRepo.findAdmin(dto.email);
    if (admin) throw new ConflictException('Admin Already Registered Before');
    const hash = await argon2.hash(dto.password);
    dto.password = hash;
    const admins = await this.adminRepo.createAdmin(dto);
    return admins;
  }

  async signInAdmin(email: string, password: string) {
    const admin = await this.adminRepo.findAdmin(email);
    if (!admin) throw new ForbiddenException('Admin Not Found');
    const pwMatch = await argon2.verify(admin.password, password);
    if (!pwMatch) throw new ForbiddenException('Credential Admin Incorrect');
    return admin;
  }
}
