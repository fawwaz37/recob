import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/tabung/repository/transaction.repository';

@Injectable()
export class AdminService {
  constructor(private transactionRepo: TransactionRepository) {}

  async acceptTransaction(transaksi_id: number, status: string) {
    const transaksi = await this.transactionRepo.getOneTransactions(transaksi_id);
    if (!transaksi) return false;
    const update = await this.transactionRepo.updateStatus(transaksi_id, status);
    return update;
  }

  async getAllTransaction() {
    const list = await this.transactionRepo.getAllTransactions();
    return list;
  }

  async deleteTransaction(transaksi_id: number) {
    const transaksi = await this.transactionRepo.getOneTransactions(transaksi_id);
    if (!transaksi) return false;
    await this.transactionRepo.deleteTransaction(transaksi_id);
    return true;
  }
}
