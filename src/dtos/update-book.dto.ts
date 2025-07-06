import {IsNumber, Length, IsInt, Min, Max, IsPositive, IsEnum, IsOptional} from 'class-validator'
import { trim } from './common.dto'
import { Transform } from 'class-transformer'
import { GeneroLibro } from '../models';

const currentYear = new Date().getFullYear();

export class UpdateBookDto {
/* Validacion de id */
    @IsOptional()
    @IsNumber({}, {
        message : 'El id debe ser un numero'
    })
    @IsPositive({
        message: 'El ID debe ser un numero positivo'
    })
    declare id : number

/* Validacion del título */
    @IsOptional()
    @Transform(trim)
    @Length(5, 60,{
        message: 'El título del libro no puede ser más corto que $constraint1 ni más largo que $constraint2'
    })
    declare title : string

/* Validacion del autor */
    @IsOptional()
    @Transform(trim)
    @Length(3, 80,{
        message: 'El nombre del autor no puede ser más corto que $constraint1 ni más largo que $constraint2'
    })
    declare author : string

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
    declare year : number

/* Validacion del género */
    @IsOptional()
    @IsEnum(GeneroLibro, {
        message: `El género del libro debe ser uno de: ${Object.values(GeneroLibro).join(', ')}`,
    })
    declare gender : GeneroLibro 
}