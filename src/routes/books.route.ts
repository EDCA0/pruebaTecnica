import express, { Router, Request, Response, NextFunction } from 'express';
import { BookService } from '../services/book.service';
import { validationHandler } from '../middlewares/validator.handler';
import { CreateBookDto } from '../dtos/create-book.dto';
import { Book, ApiResponse } from '../models';

export const booksRouter: Router = express.Router();
const service = new BookService();

// Crear libro
booksRouter.post(
	'/',
	validationHandler(CreateBookDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const body = request.body;
			const newBook = await service.create(body);

			const responseApi: ApiResponse<Book> = {
				success: true,
				statusCode: 201,
				data: newBook,
			};

			response.status(201).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

// Obtener todos
booksRouter.get(
	'/',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const books = await service.find();

			const responseApi: ApiResponse<Book[]> = {
				success: true,
				statusCode: 200,
				data: books,
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

// Obtener uno por id
booksRouter.get(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const bookId = Number(request.params.id);
			const book = await service.findOne(bookId);

			const responseApi: ApiResponse<Book> = {
				success: true,
				statusCode: 200,
				data: book,
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

// Actualizacion parcial
booksRouter.patch(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const bookId = Number(request.params.id);
			const body = request.body;
			const updatedBook = await service.updatePatch(bookId, body);

			const responseApi: ApiResponse<Book> = {
				success: true,
				statusCode: 200,
				data: updatedBook,
			};
			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

// Actualizacion total
booksRouter.put(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const bookId = Number(request.params.id);
			const body = request.body;
			const updatedBook = await service.updatePut(bookId, body);

			const responseApi: ApiResponse<Book> = {
				success: true,
				statusCode: 200,
				data: updatedBook,
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

// Eliminar uno por id
booksRouter.delete(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const bookId = Number(request.params.id);
			await service.delete(bookId);

			response.sendStatus(204); //> No content
		} catch (error) {
			next(error);
		}
	},
);
