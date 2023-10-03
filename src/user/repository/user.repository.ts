import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity';
import { CreateUserDto } from 'src/auth/dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(dto: CreateUserDto) {
    const user = this.create(dto);
    return this.save(user);
  }

  async findOneUser(email: string) {
    return this.findOneBy({ email });
  }

  async updatePassword(email: string, password: string) {
    const user = await this.findOneUser(email);
    if (!user) {
      return null;
    }
    user.password = password;
    return this.save(user);
  }
}
