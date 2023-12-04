import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto, SignUserDto, ResetPassDto } from 'src/auth/dto';
import * as argon2 from 'argon2';
import * as ejs from 'ejs';
import { UserRepository } from 'src/user/repository/user.repository';
import { OtpRepository } from 'src/user/repository/otp.repository';
import { CartRepository } from 'src/tabung/repository/cart.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private otpRepo: OtpRepository,
    private jwt: JwtService,
    private cartRepo: CartRepository,
    private readonly mailerService: MailerService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const user = await this.userRepo.findOneUser(dto.email);
    if (user) throw new ForbiddenException('User Already Registered Before');
    const hash = await argon2.hash(dto.password);
    dto.password = hash;
    const users = await this.userRepo.createUser(dto);

    // const cart = new Cart();
    // cart.user = users;
    // await this.cartRepo.createCart(cart);
    return this.signToken(users.user_id, users.email);
  }

  async signIn(dto: SignUserDto) {
    const user = await this.userRepo.findOneUser(dto.email);
    if (!user) throw new NotFoundException('User Not Found');
    const pwMatch = await argon2.verify(user.password, dto.password);
    if (!pwMatch) throw new ForbiddenException('Credential User Incorrect');
    return this.signToken(user.user_id, user.email);
  }

  async signToken(id: number, email: string): Promise<{ access_token: string }> {
    const payload = { sub: id, email };
    const secret = process.env.SECRET_JWT;
    const token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '12h',
    });

    return {
      access_token: token,
    };
  }

  async forgotPassword(email: string) {
    try {
      const otp = await this.otpRepo.createOTP(email);
      const data = await ejs.renderFile('./public/email/forgotPass.ejs', {
        url: `localhost:3000/`,
        otp: otp.code,
      });

      this.mailerService.sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: `Reset Password Recob - Bank Sampah`,
        text: 'Recob',
        html: data,
        attachments: [
          {
            filename: 'recob.png',
            path: './public/image/logo.png',
            cid: 'logo',
          },
        ],
      });

      return { code_otp: otp.code };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async verificationCode(body: { email: string; code: string }) {
    const data = await this.otpRepo.findOtp(body.email, body.code);
    if (!data) {
      throw new NotFoundException('Code OTP dan Email Tidak Sesuai');
    }
    return data;
  }

  async resetPassword(dto: ResetPassDto) {
    const code = await this.otpRepo.findOtp(dto.email, dto.code);
    if (!code) {
      throw new NotFoundException('Code OTP dan Email Tidak Sesuai / Code OTP Expired');
    }
    const hash = await argon2.hash(dto.password);
    const data = await this.userRepo.updatePassword(dto.email, hash);
    if (!data) {
      throw new NotFoundException('Data User Tidak Ditemukan');
    }
    await this.otpRepo.deleteOtp(code.code);
    return { message: 'Sukses Reset Password' };
  }
}
