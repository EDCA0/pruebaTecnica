import {IsUUID, IsNotEmpty, Length, IsInt, Min, Max, IsPositive, IsEnum, IsOptional} from 'class-validator'
import { trim } from './common.dto'
import { UUID } from 'crypto'
import { Transform } from 'class-transformer'
import { GeneroLibro } from '../models';

const currentYear = new Date().getFullYear();

export class UpdateBookDto {
/* Validacion de id */
    @IsOptional()
    @IsNotEmpty({
        message: 'El id no puede estar vacío',
    })
    @IsUUID('4')
    declare id : UUID

/* Validacion del título */
    @IsOptional()
    @Transform(trim)
    @Length(10, 60,{
        message: 'El título del libro no puede ser más corto que $constraint1 ni más largo que $constraint2'
    })
    declare titulo : string

/* Validacion del autor */
    @IsOptional()
    @Transform(trim)
    @Length(3, 80,{
        message: 'El nombre del autor no puede ser más corto que $constraint1 ni más largo que $constraint2'
    })
    declare autor : string

/* Validacion del año */
    @IsOptional()
    @IsInt({
        message: 'El año debe ser un número entero'
    })
    @IsPositive({
        message: 'El año debe ser un número positivo'
    })
    @Min(1455, {
        message:'El año de publicación debe ser igual o posterior a $constraint1'
    })
    @Max(currentYear, {message: 'El año de publicación no puede ser mayor al año actual $constraint1'
    })
    declare anio : number

/* Validacion del género */
    @IsOptional()
    @IsEnum(GeneroLibro, {
        message: `El género del libro debe ser uno de: ${Object.values(GeneroLibro).join(', ')}`,
    })
    declare genero : GeneroLibro 
}