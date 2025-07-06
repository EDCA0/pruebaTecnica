import { Book } from '../models';
import { CreateBookDto } from '../dtos/create-book.dto';
import { Books } from '../entities/books';
import { NotFoundError } from '../utils/httpErrors';
import { UpdateBookDto } from '../dtos/update-book.dto';

export class BookService {
	constructor() {}

	/**
	 * Crea un nuevo libro en la base de datos.
	 * @param {CreateBookDto} body - Los datos del libro a crear.
	 * @returns {Promise<Book>} El libro recién creado.
	 */
	async create(body: CreateBookDto): Promise<Book> {
		const newBook = new Books();

		Object.assign(newBook, body);

		await newBook.save();
		return newBook;
	}

	/**
	 * Obtiene una lista de todos los libros.
	 * @returns {Promise<Book[]>} Un arreglo con todos los libros.
	 */
	async find(): Promise<Book[]> {
		const books = await Books.find();
		return books;
	}

	/**
	 * Busca un libro por su ID.
	 * @param {number} id - El ID del libro a buscar.
	 * @returns {Promise<Book>} El libro encontrado.
	 * @throws {NotFoundError} Si el libro con el ID especificado no se encuentra.
	 */
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

	/**
	 * Actualiza parcialmente un libro existente por su ID.
	 * @param {number} id - El ID del libro a actualizar.
	 * @param {UpdateBookDto} body - Los campos a actualizar.
	 * @returns {Promise<Book>} El libro con los datos actualizados.
	 * @throws {NotFoundError} Si el libro con el ID especificado no se encuentra.
	 */
	async updatePatch(id: number, body: UpdateBookDto): Promise<Book> {
		await Books.update(id, {
			title: body.title,
			author: body.author,
			year: body.year,
			genre: body.genre,
		});

		return this.findOne(id);
	}

	/**
	 * Reemplaza totalmente un libro existente por su ID.
	 * @param {number} id - El ID del libro a reemplazar.
	 * @param {CreateBookDto} body - Los nuevos datos completos del libro.
	 * @returns {Promise<Book>} El libro con los datos actualizados.
	 * @throws {NotFoundError} Si el libro con el ID especificado no se encuentra.
	 */
	async updatePut(id: number, body: CreateBookDto): Promise<Book> {
		await Books.update(id, body);

		return this.findOne(id);
	}

	/**
	 * Elimina un libro por su ID.
	 * @param {number} id - El ID del libro a eliminar.
	 * @returns {Promise<void>}
	 * @throws {NotFoundError} Si el libro con el ID especificado no se encuentra.
	 */
	async delete(id: number): Promise<void> {
		await this.findOne(id);
		await Books.delete(id);
	}
}
