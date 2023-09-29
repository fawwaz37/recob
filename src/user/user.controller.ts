import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from './entity';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('/me')
  secure(@GetUser('') user: User) {
    return user;
  }
}
