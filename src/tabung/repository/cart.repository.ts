import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Cart } from '../entity/cart.entity';
import { Sampah } from 'src/admin/entity/sampah.entity';

@Injectable()
export class CartRepository extends Repository<Cart> {
  constructor(private dataSource: DataSource) {
    super(Cart, dataSource.createEntityManager());
  }

  async createCart(user: any, sampah: Sampah, quantity: number): Promise<Cart> {
    const cart = this.create({
      user,
      sampah,
      quantity,
      subtotal: quantity * sampah.reward,
    });
    return this.save(cart);
  }

  async checkKeranjang(user: number, product: string) {
    return await this.findOne({
      where: { user: { user_id: user }, sampah: { barang_id: product } },
    });
  }

  async cartUser(user_id: number): Promise<Cart[]> {
    return await this.find({
      where: { user: { user_id } },
      relations: {
        sampah: true,
      },
    });
  }

  async editCart(cart_id: number, quantity: number) {
    const cart = await this.findOne({
      where: { cart_id },
      relations: {
        sampah: true,
      },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    cart.quantity = quantity;
    cart.subtotal = quantity * cart.sampah.reward;
    return this.save(cart);
  }

  async deleteCart(cart_id: number) {
    return await this.delete({ cart_id });
  }
}
