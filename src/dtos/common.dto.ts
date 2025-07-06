import { TransformFnParams } from 'class-transformer';

/**
 * Función de transformación que elimina espacios en blanco al inicio y final de cadenas
 *
 * Esta función se utiliza con el decorador @Transform de class-transformer
 * para normalizar automáticamente los strings de entrada, eliminando espacios
 * innecesarios que podrían causar problemas en la validación o almacenamiento.
 *
 * @param {TransformFnParams} params - Parámetros de transformación de class-transformer
 * @param {unknown} params.value - Valor a transformar
 * @returns {string | unknown} Cadena sin espacios en blanco o el valor original si no es string
 *
 * @example
 * // Uso con decorador @Transform
 * @Transform(trim)
 * title: string;
 *
 * // Entrada: "-    El Quijote    -"
 * // Salida: "El Quijote"
 *
 */ export const trim = ({ value }: TransformFnParams): string | unknown => {
	if (typeof value === 'string') {
		return value.trim(); //> Si se necesita que el texto esté únicamente sin espacios (nombres etc..)
	}
	return value;
};

/**
 * Función de transformación que elimina espacios en blanco y convierte a minúsculas
 *
 * Especialmente útil para campos que requieren normalización como emails,
 * nombres de usuario, códigos de identificación, etc. Combina trim() con
 * toLowerCase() para garantizar consistencia en los datos.
 *
 * @param {TransformFnParams} params - Parámetros de transformación de class-transformer
 * @param {unknown} params.value - Valor a transformar
 * @returns {string | unknown} Cadena sin espacios en blanco y en minúsculas, o el valor original si no es string
 *
 * @example
 * ```typescript
 * // Uso con decorador @Transform
 * @Transform(trimLower)
 * email: string;
 *
 * // Entrada: "  Usuario@EjEmPlO.CoM  "
 * // Salida: "usuario@ejemplo.com"
 */
export const trimLower = ({ value }: TransformFnParams): string | unknown => {
	if (typeof value === 'string') {
		return value.trim().toLowerCase(); //> En caso de modularización tener todo sin espacios y en lowercase(correos etc...)
	}
	return value;
};
