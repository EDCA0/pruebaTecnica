import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/httpErrors';

/**
 * Crea un middleware de Express que valida el cuerpo de la solicitud (request.body) contra una clase DTO (Data Transfer Object) específica.
 * @template T - El tipo del DTO, debe ser un objeto.
 * @param dtoClass - La clase del DTO que se usará como molde para la validación.
 * @returns Un middleware de Express listo para usar en una ruta.
 */
export function validationHandler<T extends object>(dtoClass: { new (): T }) {
	return async (request: Request, _response: Response, next: NextFunction) => {
		//Retornará la función middleware asincrónica que Express ejecutará.
		try {
			const dtoInstance = plainToInstance(dtoClass, request.body); //> Transforma el objeto plano del request.body a una instancia de la clase DTO.
			const errors = await validate(dtoInstance); //> Valida la instancia del DTO. Si hay errores, devuelve un array de objetos ValidationError.

			if (errors.length > 0) {
				const messages = errors.flatMap(
					(
						error, //> Extrae todos los mensajes de error en un solo array de strings.
					) => Object.values(error.constraints ?? {}), //> Extrae los mensajes de error del objeto 'constraints'. Si 'constraints' no existe, devuelve un array vacío.
				);
				throw new BadRequestError(messages); //> Lanza un error personalizado que contiene los mensajes, para que lo capture el errorHandler.
			}
			next(); //> Si no hay errores, la solicitud continúa al siguiente middleware (el controlador).
		} catch (error) {
			/* *
			 * Si ocurre cualquier error (incluido el BadRequestError),
			 * se pasa a la cadena de manejo de errores de Express.
			 */
			next(error);
		}
	};
}
