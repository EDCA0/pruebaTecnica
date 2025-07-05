/**
 * Clase base para crear errores HTTP personalizados y controlados.
 * Permite encapsular un código de estado y detalles del error.
 */

export class HttpError extends Error {
	/** Código de estado HTTP del error (ej. 404, 400). */
	statusCode: number;
    /** Detalles del error, puede ser un mensaje único o un array de mensajes (para validaciones). */
    details: string | string[]

/**
* @param {string | string[]} message - El mensaje o lista de mensajes de error.
* @param {number} statusCode - El código de estado HTTP.
*/
	constructor(message: string | string[], statusCode: number) {
	    // La clase base 'Error' requiere un único string en su constructor.
        let  errorMessage : string;

        if(Array.isArray(message)) {
            errorMessage = message.join(', ')
        } else {
             errorMessage = message
        }

		super(errorMessage);

		this.statusCode = statusCode;
		// Guardamos el mensaje/array original en nuestra propiedad personalizada.
        this.details = message
	}
}

/**
 * Representa un error HTTP 404 (Not Found).
 * Usar cuando no se encuentra un recurso solicitado.
 */
export class NotFoundError extends HttpError {
	constructor(message: string = 'Recurso no encontrado') {
		super(message, 404);
	}
}

/**
 * Representa un error HTTP 400 (Bad Request).
 * Ideal para errores de validación del cliente.
 */
export class BadRequestError extends HttpError {
	constructor(message: string | string[] = 'Petición incorrecta') {
		super(message, 400);
	}
}
