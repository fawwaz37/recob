import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  bank_id: number;

  @Column()
  bank_code: string;

  @Column()
  no_rek: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => User)
  @JoinColumn() // Ini akan membuat kolom foreign key di tabel "Bank"
  user: User;
}
