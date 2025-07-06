import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './db';
import { app } from './app';

async function main() {
	try {
		await AppDataSource.initialize();
		console.log('Base de datos conectada correctamente');

		/* Lectura del puerto desde las variables de entorno. */
		const port = Number(process.env.PORT) || 3000;

		/* Escucha al puerto  */
		app.listen(port, () => {
			console.log(`Servidor escuchando en el puerto ${port}`);
		});
	} catch (error) {
		console.error('Error al conectar a la base de datos:', error);
	}
}

main();
