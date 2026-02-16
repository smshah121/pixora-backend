import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { SavedItem } from './saved-items/entities/saved-item.entity';
import { Collections } from './collection/entities/collection.entity';


dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: [User, SavedItem, Collections],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true, // optional but useful for debug
});
