import * as cron from 'node-cron';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly otpService: UserService) {}

  startCron() {
    cron.schedule('*/5 * * * *', async () => {
      try {
        await this.otpService.deleteExpiredOTP();
      } catch (error) {
        console.error('Gagal menghapus data OTP yang kedaluwarsa:', error);
      }
    });
  }
}
