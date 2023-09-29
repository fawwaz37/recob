import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  otp_id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  email: string;

  @Column()
  expirationDate: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
