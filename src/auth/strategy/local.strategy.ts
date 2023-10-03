import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthAdminService } from '../admin/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private readonly adminService: AuthAdminService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const admin = await this.adminService.signInAdmin(email, password);
    return admin;
  }
}
