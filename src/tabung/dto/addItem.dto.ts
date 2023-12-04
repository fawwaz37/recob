import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddItemDto {
  @IsString()
  @IsNotEmpty()
  barang_id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
