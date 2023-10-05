import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSampahDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  reward: number;

  @IsString()
  @IsOptional()
  image: string;
}
