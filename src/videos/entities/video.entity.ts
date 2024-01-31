import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { LikeEntity } from '../../likes/entities/like.entity';

@Entity('videos')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userId) => userId.videos)
  userId: UserEntity;

  @Column({ default: 0 })
  numLikes: number;

  @Column()
  title: string;

  @Column({ length: 200, unique: true })
  url: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['public', 'private'] })
  view: string;

  @OneToMany(() => LikeEntity, (like) => like.video)
  likes: LikeEntity[];
}
