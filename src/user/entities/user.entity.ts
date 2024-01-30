import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;

  @Column({ length: 100 })
  userName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
