import { Book } from '../models';
import { CreateBookDto } from '../dtos/create-book.dto';
import { Books } from '../entities/books';
import { NotFoundError } from '../utils/httpErrors';
import { UpdateBookDto } from '../dtos/update-book.dto';

export class BookService {
	constructor() {}

	// Crear libro
	async create(body: CreateBookDto): Promise<Book> {
		const book = new Books();
		book.title = body.title;
		book.author = body.author;
		book.year = body.year;
		book.genre = body.genre;

		await book.save();

		return book;
	}

	// Obtener todos
	async find(): Promise<Book[]> {
		const book = await Books.find();
		return book;
	}

	//  Obtener uno por id
	async findOne(id: number): Promise<Book> {
		const book = await Books.findOne({
			where: {
				id: id,
			},
		});

		if (!book) {
			throw new NotFoundError('Libro no encontrado');
		}

		return book;
	}

	// Actualizacion parcial
	async updatePatch(id: number, body: UpdateBookDto): Promise<Book> {
		await Books.update(id, {
			title: body.title,
			author: body.author,
			year: body.year,
			genre: body.gender,
		});

		return this.findOne(id);
	}

	// Actualizacion total
	async updatePut(id: number, body: CreateBookDto): Promise<Book> {
		await Books.update(id, body);

		return this.findOne(id);
	}

	// Eliminar uno por id
	async delete(id: number): Promise<void> {
		await Books.delete(id);
	}
}
