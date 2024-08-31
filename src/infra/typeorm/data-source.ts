import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Measure from './entities/measure';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'shopper',
  password: 'shopper',
  database: 'shopper',
  synchronize: true,
  entities: [
    Measure,
  ],
});

export default AppDataSource;
