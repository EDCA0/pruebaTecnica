import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Books } from './entities/books';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	username: process.env.DB_USERNAME || 'postgres',
	password: process.env.DB_PASSWORD || 'admin1234',
	schema: 'public',
	port: Number(process.env.DB_PORT) || 5433,
	database: process.env.DB_DATABASE|| 'pruebatecnica',
	synchronize: false,
	logging: process.env.DB_LOGGING === 'true',
	entities: [Books],
	migrations: ['src/migrations/*.ts'],
	subscribers: [],
});
