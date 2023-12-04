import { Cart } from 'src/tabung/entity/cart.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Sampah {
  @PrimaryGeneratedColumn('uuid')
  barang_id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  image: string;

  @Column()
  reward: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Cart, (item) => item.sampah, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart: Cart[];
}
