import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  poin: number;

  @Column()
  password: string;

  @Column({ default: './public/profile/none.jpg' })
  image: string;

  @Column({ nullable: true })
  alamat: string;

  @Column({ nullable: true })
  long: string;

  @Column({ nullable: true })
  lat: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}