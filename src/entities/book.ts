import { Column, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";
import { GeneroLibro } from "../models";

@Entity()
export class Book {
    
    @PrimaryGeneratedColumn()
    declare id : number

    @Column()
    declare titulo: string

    @Column()
    declare autor : string

    @Column()
    declare anio : number

    @Column()
    declare genero : GeneroLibro

}