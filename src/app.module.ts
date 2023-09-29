import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SchedulerService } from './lib/scheduler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AllPurposeInterceptor } from './lib/all-purpose.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: true, // Only Dev
      entities: [__dirname + '/**/*.entity.{js,ts}'],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
        from: process.env.EMAIL,
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SchedulerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AllPurposeInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private readonly schedulerService: SchedulerService) {
    this.schedulerService.startCron();
  }
}
