import {
	IsNumber,
	Length,
	IsInt,
	Min,
	Max,
	IsPositive,
	IsEnum,
	IsOptional,
} from 'class-validator';
import { trim } from './common.dto';
import { Transform } from 'class-transformer';
import { GeneroLibro } from '../models';

const currentYear = new Date().getFullYear();

/**
 * DTO para la actualización de libros existentes
 * 
 * Define la estructura y validaciones para actualizar un libro existente.
 * Todos los campos son opcionales,  permitiendo actualizaciones parciales. 
 * Mantiene las mismas validaciones que CreateBookDto pero aplicadas
 * solo cuando los campos están presentes.
 * 
 * @class UpdateBookDto
 * 
 * @example
 * ```typescript
 * const updateData: UpdateBookDto = {
 *   id: 1,
 *   title: "Don Quijote de la Mancha - Edición Revisada",
 *   year: 1615
 * };
 * ```
*/
export class UpdateBookDto {
/**
    * ID único del libro a actualizar
    * 
    * Debe ser un número entero positivo que identifique de manera única
    * el libro en el sistema. Es el único campo técnicamente requerido
    * para realizar una actualización, aunque se marca como opcional
    * para flexibilidad en diferentes contextos de uso.
    * 
    * @type {number}
    * @memberof UpdateBookDto
    * @example 1
*/	
    @IsOptional()
	@IsNumber(
		{},
		{
			message: 'El id debe ser un numero',
		},
	)
	@IsPositive({
		message: 'El ID debe ser un numero positivo',
	})
	declare id: number;

/**
    * Título del libro (opcional para actualización)
    * 
    * Cuando se proporciona, se aplica la misma validación que en CreateBookDto:
    * transformación trim() y validación de longitud entre 5 y 60 caracteres.
    * 
    * @type {string}
    * @memberof UpdateBookDto
    * @optional
    * @example "El Ingenioso Hidalgo Don Quijote de la Mancha"
*/	
    @IsOptional()
	@Transform(trim)
	@Length(5, 60, {
		message:
			'El título del libro no puede ser más corto que $constraint1 ni más largo que $constraint2',
	})
	declare title: string;

/**
    * Nombre completo del autor (opcional para actualización)
    * 
    * Cuando se proporciona, se aplica la misma validación que en CreateBookDto:
    * transformación trim() y validación de longitud entre 3 y 80 caracteres.
    * 
    * @type {string}
    * @memberof UpdateBookDto
    * @optional
    * @example "Miguel de Cervantes Saavedra"
*/	
    @IsOptional()
	@Transform(trim)
	@Length(3, 80, {
		message:
			'El nombre del autor no puede ser más corto que $constraint1 ni más largo que $constraint2',
	})
	declare author: string;

/**
    * Año de publicación (opcional para actualización)
    * 
    * Cuando se proporciona, debe cumplir las mismas validaciones que en CreateBookDto:
    * número entero positivo entre 1455 y el año actual.
    * 
    * @type {number}
    * @memberof UpdateBookDto
    * @optional
    * @example 1615
*/	
    @IsOptional()
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
    * Género literario (opcional para actualización)
    * 
    * Cuando se proporciona, debe ser uno de los valores válidos del enum GeneroLibro.
    * Se aplica la misma validación que en CreateBookDto.
    * 
    * @type {GeneroLibro}
    * @memberof UpdateBookDto
    * @optional
    * @example GeneroLibro.NOVELA_HISTORICA
*/	
    @IsOptional()
	@IsEnum(GeneroLibro, {
		message: `El género del libro debe ser uno de: ${Object.values(GeneroLibro).join(', ')}`,
	})
	declare gender: GeneroLibro;
}
