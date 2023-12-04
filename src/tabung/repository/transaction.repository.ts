import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Transaksi } from '../entity/transaction.entity';
import { User } from 'src/user/entity';

@Injectable()
export class TransactionRepository extends Repository<Transaksi> {
  constructor(private dataSource: DataSource) {
    super(Transaksi, dataSource.createEntityManager());
  }

  async createTransaksi(user: User, subtotal: number): Promise<Transaksi> {
    const transaksi = this.create({ user, subtotal });
    return this.save(transaksi);
  }

  async getUserTransaction(user: User) {
    return await this.find({
      where: { user: { user_id: user.user_id } },
      relations: {
        items: true,
      },
    });
  }

  async findUserTransactionsWithDetails(userId: number): Promise<Transaksi[]> {
    return this.createQueryBuilder('transaksi')
      .leftJoinAndSelect('transaksi.items', 'item')
      .leftJoinAndSelect('item.sampah', 'sampah')
      .leftJoinAndSelect('item.transaksi', 'transaksi')
      .where('transaksi.user.user_id = :userId', { userId })
      .orderBy('transaksi.created_at', 'DESC')
      .getMany();
  }

  async findUserTransactionsWithDetails2(userId: number): Promise<Transaksi[]> {
    return this.createQueryBuilder('transaksi')
      .leftJoinAndSelect('transaksi.items', 'item')
      .leftJoinAndSelect('item.sampah', 'sampah')
      .leftJoinAndSelect('item.transaksi', 'transaksiItem')
      .where('transaksi.user.user_id = :userId', { userId })
      .orderBy('transaksi.created_at', 'DESC')
      .getMany();
  }
}
