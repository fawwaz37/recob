import { Injectable } from '@nestjs/common';
import { DataSource, LessThan, Repository } from 'typeorm';
import { OTP } from '../entity';
import generateRandomCode from 'src/lib/random';
import { addMinutes } from 'date-fns';

@Injectable()
export class OtpRepository extends Repository<OTP> {
  constructor(private dataSource: DataSource) {
    super(OTP, dataSource.createEntityManager());
  }

  async createOTP(email: string) {
    const code = generateRandomCode(4);
    const otp = this.create({
      email,
      code,
      expirationDate: addMinutes(new Date(), 10),
    });
    return this.save(otp);
  }

  async deleteExpiredOTP() {
    const currentDate = new Date();
    await this.delete({ expirationDate: LessThan(currentDate) });
  }

  async deleteOtp(code: string) {
    const data = await this.findOne({ where: { code } });
    await this.remove(data);
  }

  async findOtp(email: string, code: string) {
    const data = await this.findOne({ where: { email, code } });
    return data;
  }
}
