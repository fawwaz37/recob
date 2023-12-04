import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { Transaksi } from './transaction.entity';
import { Sampah } from 'src/admin/entity/sampah.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @ManyToOne(() => Sampah, (sampah) => sampah.cart)
  @JoinColumn({ name: 'barang_id' })
  sampah: Sampah;

  @ManyToOne(() => Transaksi, (transaksi) => transaksi.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'transaksi_id' })
  transaksi: Transaksi;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
