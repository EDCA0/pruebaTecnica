import { Book } from "../models";
import { CreateBookDto } from "../dtos/create-book.dto";
import { Books } from "../entities/books";

export class BookService {    
    constructor () {};

// Crear producto
   async create (body : CreateBookDto) : Promise<Book>{
        const book = new Books() 
        book.title = body.title
        book.author = body.author
        book.year = body.year
        book.gender = body.gender
        
        await book.save()

        return book
    }

    async find () : Promise<Book[]> {
        const book = await Books.find()
        return book;
    }
}
// //  Obtener todos
//     async find () : Promise<Book[]>{
//         return this.books;
//     }

// // Obtener uno 
//     async findOne (id : string) : Promise<Book> {
//         const book = this.books.find(item => item.id === id);

//         if(!book) {
//             throw new NotFoundError ('Libro no encontrado');
//         }

//         return book;
//     }

// //  Actualizacion parcial
//     async updatePatch (id : string, body: UpdateBookDto) : Promise<Book> {
//         const index = this.books.findIndex(item => item.id === id);

//         if(!this.books[index]) {
//             throw new NotFoundError ('Libro no encontrado');
//         }

//         this.books[index] = {
//             ...this.books[index],
//             ...body
//         }

//         return this.books[index]
//     }
// }
// //     async updatePut (id : string, body: CreateBookDto) : Promise<Book> {
// //         const book = this.books.find(item => item.id === id);

// //         if(!book) {
// //             throw new NotFoundError('Libro no encontrado');
// //         }

// //         this
// //     }
// // }