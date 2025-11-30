import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Customer } from './entity/Customer.js';
import { DashboardData } from './entity/DashboardData.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === 'development', // Auto-create tables in development
  logging: process.env.NODE_ENV === 'development',
  entities: [Customer, DashboardData],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
  options: {
    encrypt: true, // Set to true if using Azure SQL
    trustServerCertificate: true, // For local development
  },
});
