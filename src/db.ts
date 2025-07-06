import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Books } from './entities/books';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'admin1234',
	schema: 'public',
	port: 5433,
	database: 'pruebatecnica',
	synchronize: false,
	logging: true,
	entities: [Books],
	migrations: ['src/migrations/*.ts'],
	subscribers: [],
});
