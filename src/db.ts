import "reflect-metadata"
import { DataSource } from "typeorm"
import { Book } from "./entities/book"
import { GeneroLibro } from "./models"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin1234',
    schema: 'public',
    port: 5433,
    database: 'pruebatecnica',
    synchronize: true,
    logging: true,
    entities: [Book],
    migrations: [],
    subscribers: [],
})

 //Desactivar synchronize y loggin para prod - usar migraciones 