import * as cron from 'node-cron';
import { Injectable } from '@nestjs/common';
import { OtpRepository } from 'src/user/repository/otp.repository';

@Injectable()
export class SchedulerService {
  constructor(private readonly otpRepo: OtpRepository) {}

  startCron() {
    cron.schedule('*/5 * * * *', async () => {
      try {
        await this.otpRepo.deleteExpiredOTP();
      } catch (error) {
        console.error('Gagal menghapus data OTP yang kedaluwarsa:', error);
      }
    });
  }
}
