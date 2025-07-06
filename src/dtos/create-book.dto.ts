import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsPositive, Length, Max, Min } from 'class-validator';
import { GeneroLibro } from '../models';
import { trim } from './common.dto';

const currentYear = new Date().getFullYear();

/**
 * DTO para la creación de nuevos libros
 *
 * Define la estructura y validaciones necesarias para crear un nuevo libro en el sistema.
 * Todos los campos son obligatorios y deben cumplir con las validaciones establecidas.
 * Utiliza class-validator para validaciones automáticas y class-transformer para
 * normalización de datos de entrada.
 *
 * @class CreateBookDto
 *
 * @example
 * ```typescript
 * const newBook: CreateBookDto = {
 *   title: "Cien años de soledad",
 *   author: "Gabriel García Márquez",
 *   year: 1967,
 *   genre: GeneroLibro.REALISMO_MAGICO
 * };
 */
export class CreateBookDto {
	/**
	 * Título del libro
	 *
	 * Se aplica transformación trim() para eliminar espacios innecesarios.
	 * La longitud debe estar entre 5 y 60 caracteres para garantizar
	 * títulos significativos pero no excesivamente largos.
	 *
	 * @type {string}
	 * @memberof CreateBookDto
	 * @example "El Quijote de la Mancha"
	 */
	@Transform(trim)
	@Length(5, 100, {
		message:
			'El título del libro no puede ser más corto que $constraint1 ni más largo que $constraint2',
	})
	declare title: string;

	/**
	 * Nombre completo del autor del libro
	 *
	 * Se aplica transformación trim() para eliminar espacios innecesarios.
	 * La longitud debe estar entre 3 y 80 caracteres para acomodar
	 * desde nombres cortos hasta nombres compuestos largos.
	 *
	 * @type {string}
	 * @memberof CreateBookDto
	 * @example "Miguel de Cervantes Saavedra"
	 */
	@Transform(trim)
	@Length(3, 80, {
		message:
			'El nombre del autor no puede ser más corto que $constraint1 ni más largo que $constraint2',
	})
	declare author: string;

	/**
	 * Año de publicación del libro
	 *
	 * Debe ser un número entero positivo entre 1455 (año de la primera imprenta
	 * de Gutenberg) y el año actual. Se valida dinámicamente contra el año actual
	 * para evitar fechas futuras irreales.
	 *
	 * @type {number}
	 * @memberof CreateBookDto
	 * @example 1605
	 */
	@IsInt({
		message: 'El año debe ser un número entero',
	})
	@IsPositive({
		message: 'El año debe ser un número positivo',
	})
	@Min(1455, {
		message: 'El año de publicación debe ser igual o posterior a $constraint1',
	})
	@Max(currentYear, {
		message:
			'El año de publicación no puede ser mayor al año actual $constraint1',
	})
	declare year: number;

	/**
	 * Género literario del libro
	 *
	 * Debe ser uno de los valores definidos en el enum GeneroLibro.
	 * La validación se realiza automáticamente contra los valores permitidos
	 * y el mensaje de error incluye la lista completa de opciones válidas.
	 *
	 * @type {GeneroLibro}
	 * @memberof CreateBookDto
	 * @example GeneroLibro.FICCION
	 */
	@IsEnum(GeneroLibro, {
		message: `El género del libro debe ser uno de: ${Object.values(GeneroLibro).join(', ')}`,
	})
	declare genre: GeneroLibro;
}
