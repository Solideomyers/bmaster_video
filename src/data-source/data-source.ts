import { DataSource } from 'typeorm';
import { envs } from '../config/envs';
import { UserEntity } from '../user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.DB_LOCALHOST,
  port: envs.DB_PORT,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});
