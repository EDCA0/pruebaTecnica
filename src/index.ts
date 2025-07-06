import 'reflect-metadata';
import { AppDataSource } from "./db"
import {app, port} from './app';
import { Book } from './entities/book';
import { GeneroLibro } from './models';

async function main() {
try {
        await AppDataSource.initialize()
        const b = new Book()
b.anio = 200,
b.autor = '',
b.genero = GeneroLibro.AUTOAYUDA,
b.titulo = ''
console.log(await AppDataSource.getRepository(Book).findOne({
    where: {
        id: 2
    }
}), )
AppDataSource.getRepository(Book).save(b)
     /* Escucha al puerto  */
        app.listen(port, () => {
        console.log('Mi port ', port);
    })
} catch (error ) {
    console.error(error);
}
}

main()