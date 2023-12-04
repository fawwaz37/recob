import { User } from 'src/user/entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cart } from './cart.entity';
import { Item } from './item.entity';

@Entity()
export class Transaksi {
  @PrimaryGeneratedColumn()
  transaksi_id: number;

  @OneToMany(() => Item, (item) => item.transaksi, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  items: Item[];

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.transaksis, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  subtotal: number;
}
