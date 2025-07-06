import 'reflect-metadata';
import { AppDataSource } from "./db"
import {app, port} from './app';


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