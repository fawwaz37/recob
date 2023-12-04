import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './repository/cart.repository';
import { AddItemDto } from './dto';
import { SampahRepository } from 'src/admin/repository/sampah.repository';
import { User } from 'src/user/entity';
import { Item } from './entity/item.entity';
import { TransactionRepository } from './repository/transaction.repository';
import { ItemRepository } from './repository/item.repository';

@Injectable()
export class TabungService {
  constructor(
    private cart: CartRepository,
    private sampahRepo: SampahRepository,
    private transaksiRepo: TransactionRepository,
    private itemRepo: ItemRepository,
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

  async createTransaksi(user: User) {
    const cartItems = await this.cart.cartUser(user.user_id);
    if (!cartItems || cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    const totalSubtotal = cartItems.reduce((sum, cartItem) => sum + cartItem.subtotal, 0);
    const transaksi = await this.transaksiRepo.createTransaksi(user, totalSubtotal);

    for (const cartItem of cartItems) {
      const item = new Item();
      item.transaksi = transaksi;
      item.sampah = cartItem.sampah;
      item.quantity = cartItem.quantity;
      item.subtotal = cartItem.sampah.reward * cartItem.quantity;

      await this.itemRepo.createItem(item);

      await this.cart.deleteCart(cartItem.cart_id);
    }

    return transaksi;
  }

  async getTransactionUser(user: User) {
    const data = await this.transaksiRepo.findUserTransactionsWithDetails2(user.user_id);
    return { user, data };
  }
}
