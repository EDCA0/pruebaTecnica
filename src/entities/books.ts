import { Column, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";
import { GeneroLibro } from "../models";

@Entity()
export class Books {
    
    @PrimaryGeneratedColumn()
    declare id : number

    @Column()
    declare title: string

    @Column()
    declare author : string

    @Column()
    declare year : number

    @Column()
    declare gender : GeneroLibro

}