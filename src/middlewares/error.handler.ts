import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/httpErrors';

/**
 * Middleware para registrar errores en la consola. Es el primer middleware de errores
 * @param {Error} error - El objeto de error capturado por Express.
 * @param {Request} _request - El objeto de la solicitud (no se usa).
 * @param {Response} _response - El objeto de la respuesta (no se usa).
 * @param {NextFunction} next - La función para pasar el error al siguiente middleware.
 */
export function logErrors(
	error: Error,
	_request: Request,
	_response: Response,
	next: NextFunction,
) {
	console.error(error); //> Imprime el error completo en la consola para fines de depuración y registro
	next(error);
}

/**
 * Middleware para formatear y enviar una respuesta de error estandarizada al cliente, es el último middleware en la cadena de errores.
 * @param {Error} error - El objeto de error proveniente del middleware anterior.
 * @param {Request} _request - El objeto de la solicitud (no se usa).
 * @param {Response} response - El objeto de la respuesta que se enviará al cliente.
 * @param {NextFunction} _next - El parámetro next es requerido por Express, pero no se usa aquí.
 */
export function errorHandler(
	error: Error,
	_request: Request,
	response: Response,
	_next: NextFunction,
) {
	let statusCode: number;
	let errorDetails: string | string[];

	/* Verifica si el error es una instancia de la clase de error personalizada (HttpError) */
	if (error instanceof HttpError) {
		/* Usará el código y el mensaje que traiga el error */
		statusCode = error.statusCode;
		errorDetails = error.details;
	} else {
		/* Si no es una instancia de HttpError implica que es un error inesperado */
		statusCode = 500;
		errorDetails = 'Ha ocurrido un error inesperado';
	}

	const finalResponse = {
		success: false,
		statusCode: statusCode,
		data: null,
		error: errorDetails,
	};
	/* Evita exponer el stack en caso de que esté en producción por seguridad */
	if (process.env.NODE_ENV === 'development') {
		(finalResponse as any).stack = error.stack;
	}

	/* Envía la respuesta final al cliente con el código de estado y el mensaje de error */
	response.status(statusCode).json(finalResponse);
}
