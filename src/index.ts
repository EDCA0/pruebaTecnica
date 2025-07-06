import 'reflect-metadata';
import { AppDataSource } from "./db"
import {app, port} from './app';
import { Books } from './entities/books';
import { GeneroLibro } from './models';

async function main() {
try {
        await AppDataSource.initialize()
     /* Escucha al puerto  */
        app.listen(port, () => {
        console.log('Mi port ', port);
    })
} catch (error ) {
    console.error(error);
}
}

main()