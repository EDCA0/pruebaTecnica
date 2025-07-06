import 'reflect-metadata';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { routerApi } from './routes';
import { errorHandler, logErrors } from './middlewares/error.handler';

/**
 * Instancia principal de Express.
 * Configura parsers JSON, logging, CORS y rutas.
 */
export const app = express();

/** Serializa body a JSON (Para poder transformarlo a JSON)*/
app.use(express.json());

/** Logger de peticiones HTTP en consola */
app.use(morgan('dev'));

/** Habilita CORS para todas las rutas */
app.use(cors());

/**
 * Monta en `app` todos los routers definidos en ./routes.
 * Ejemplo de endpoint: GET /books, POST /authors, etc.
 */
routerApi(app);

/* Middleware para manejo de errores */
app.use(logErrors);
app.use(errorHandler);

/* En caso de ir a un Endpoint No declarado */
app.use((request: Request, response: Response) => {
	response.status(404).json({
		message: 'Recurso no encontrado',
	});
});
