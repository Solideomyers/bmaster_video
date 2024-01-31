import { MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CreateVideoDto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;

  @Column({ default: 0 })
  numLikes: number;

  @Column({ default: 0 })
  numComments: number;

  @MinLength(3)
  @Column({ length: 10 })
  title: string;

  @Column({ unique: true })
  url: string;

  @Column()
  description: string;

  @Column()
  view: 'public' | 'private';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
