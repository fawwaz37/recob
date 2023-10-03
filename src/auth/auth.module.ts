import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './user/auth.service';
import { AuthController } from './user/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy, SessionSerializer } from './strategy';
import { OtpRepository } from 'src/user/repository/otp.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { AdminRepository } from 'src/admin/repository/admin.repository';
import { AuthAdminController } from './admin/auth.controller';
import { AuthAdminService } from './admin/auth.service';
import { AdminLoginRedirectMiddleware } from './guard';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    JwtStrategy,
    OtpRepository,
    UserRepository,
    AdminRepository,
    LocalStrategy,
    SessionSerializer,
    AuthAdminService,
  ],
  controllers: [AuthController, AuthAdminController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminLoginRedirectMiddleware).forRoutes('auth/admin/signin', 'auth/admin/signup');
  }
}
