import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GeneroLibro } from "../models";

@Entity()
export class Books extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    declare id : number

    @Column()
    declare title: string

    @Column()
    declare author : string

    @Column("int")
    declare year : number

    @Column()
    declare gender : GeneroLibro

}