import { randomUUID } from "crypto";
import { Book } from "../models";
import { CreateBookDto } from "../dtos/create-book.dto";
import { NotFoundError } from "../utils/httpErrors";
import { UpdateBookDto } from "../dtos/update-book.dto";

export class BookService {
    protected books : Book[]= [];
    
    constructor () {};

// Crear producto
   async create(body : CreateBookDto) {
        const newBody : Book = {
            id: randomUUID(),
            titulo: body.titulo,
            autor: body.autor,
            anio: body.anio,
            genero: body.genero
        };

        this.books.push(newBody);
        return newBody
    }

//  Obtener todos
    async find () : Promise<Book[]>{
        return this.books;
    }

// Obtener uno 
    async findOne (id : string) : Promise<Book> {
        const book = this.books.find(item => item.id === id);

        if(!book) {
            throw new NotFoundError ('Libro no encontrado');
        }

        return book;
    }

//  Actualizacion parcial
    async updatePatch (id : string, body: UpdateBookDto) : Promise<Book> {
        const index = this.books.findIndex(item => item.id === id);

        if(!this.books[index]) {
            throw new NotFoundError ('Libro no encontrado');
        }

        this.books[index] = {
            ...this.books[index],
            ...body
        }

        return this.books[index]
    }
}
//     async updatePut (id : string, body: CreateBookDto) : Promise<Book> {
//         const book = this.books.find(item => item.id === id);

//         if(!book) {
//             throw new NotFoundError('Libro no encontrado');
//         }

//         this
//     }
// }