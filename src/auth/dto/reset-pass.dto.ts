import {
  IsEmail,
  IsNotEmpty,
  IsString,
  NotEquals,
  ValidationError,
  validate,
} from 'class-validator';

export class ResetPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  // @NotEquals('password', { message: 'Passwords do not match' })
  passwordAgain: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
