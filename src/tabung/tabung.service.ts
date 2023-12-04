import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './repository/cart.repository';
import { AddItemDto } from './dto';
import { SampahRepository } from 'src/admin/repository/sampah.repository';
import { User } from 'src/user/entity';

@Injectable()
export class TabungService {
  constructor(
    private cart: CartRepository,
    private sampahRepo: SampahRepository,
  ) {}

  async addKeranjang(dto: AddItemDto, user: User) {
    const existBarang = await this.cart.checkKeranjang(user.user_id, dto.barang_id);
    if (existBarang) {
      throw new ConflictException('Barang sudah ada di keranjang. Silakan edit keranjang Anda.');
    }
    const product = await this.sampahRepo.findSampah(dto.barang_id);
    if (!product) {
      throw new NotFoundException('Barang tidak ditemukan.');
    }
    const create = await this.cart.createCart(user, product, dto.quantity);
    return { message: 'Sukses Menambahkan Sampah', data: create };
  }

  async getUserCart(user: User) {
    const data = await this.cart.cartUser(user.user_id);
    return { user, cart: data };
  }

  async editCart(quantity: number, cart_id: number) {
    const data = await this.cart.editCart(cart_id, quantity);
    return data;
  }

  async deleteItem(cart_id: number) {
    await this.cart.deleteCart(cart_id);
    return { message: 'Sukses Delete Item Pada Keranjang!' };
  }
}
