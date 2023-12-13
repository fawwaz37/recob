import { IsEmail, IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  alamat: string;

  @IsString()
  // @NotEquals('password', { message: 'Passwords do not match' })
  @IsNotEmpty()
  passwordAgain: string;
}
