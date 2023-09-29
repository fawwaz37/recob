import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import generateRandomCode from 'src/lib/random';
import { CreateUserDto } from '../auth/dto';
import { OTP, User } from './entity';
import { addMinutes } from 'date-fns';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(OTP) private otpRepo: Repository<OTP>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async findOne(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async updatePassword(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    user.password = password;
    return this.repo.save(user);
  }

  async createOTP(email: string) {
    const code = generateRandomCode(4);
    const otp = this.otpRepo.create({
      email,
      code,
      expirationDate: addMinutes(new Date(), 10),
    });
    return this.otpRepo.save(otp);
  }

  async deleteExpiredOTP() {
    const currentDate = new Date();
    await this.otpRepo.delete({ expirationDate: LessThan(currentDate) });
  }

  async deleteOtp(code: string) {
    const data = await this.otpRepo.findOne({ where: { code } });
    await this.otpRepo.remove(data);
  }

  async findOtp(email: string, code: string) {
    const data = await this.otpRepo.findOne({ where: { email, code } });
    return data;
  }
}
