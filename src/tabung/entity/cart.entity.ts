import { Sampah } from 'src/admin/entity/sampah.entity';
import { User } from 'src/user/entity';
import { Entity, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @ManyToOne(() => User, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Sampah, (item) => item.cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sampah: Sampah;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;
}
