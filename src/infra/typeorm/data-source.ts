import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Measure from './entities/measure';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: true,
  logging: false,
  entities: [
    Measure,
  ],
});

export default AppDataSource;
