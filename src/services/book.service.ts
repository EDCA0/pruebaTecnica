import { randomUUID } from "crypto";

export class BookService {
    protected books = [];
    
    constructor () {};

    async create(body : any) {
        const newBody = {
            id: randomUUID,
            titulo: body.titulo,
            autor: body.autor,
            anio: body.anio,
            genero: body.genero
        };

        this.books.push(newBody);
        return newBody
    }
}