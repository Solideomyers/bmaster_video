import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateVideoDto {
  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column()
  description: string;

  @IsNotEmpty()
  @Column()
  view: string;
}
