// data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config(); 

const dbUser = `${process.env.DATABASE_TYPE}` || 'postgres';
const dbName = process.env.DATABASE_NAME || 'appdb';
const dbUser = process.env.DATABASE_USER || 'postgres';
const dbPassword = process.env.DATABASE_PASSWORD || 'postgres';
const dbHost = process.env.DATABASE_HOST || 'localhost';
const dbPort = process.env.DATABASE_PORT || '5432';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'appdb',
  entities: ['../src/entity/**/*.ts'],
  migrations: ['../src/migration/**/*.ts'],
  synchronize: false,
  logging: false,
});

