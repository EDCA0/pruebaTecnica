import express, { Router, Request, Response, NextFunction } from "express";
import { BookService } from "../services/book.service";
import { validationHandler } from "../middlewares/validator.handler";
import { CreateBookDto } from "../dtos/create-book.dto";
import { Book } from "../models";

export const booksRouter : Router = express.Router();
const service = new BookService();

//GET
booksRouter.get('/', async (request : Request, response : Response, next : NextFunction) => {
    try {
        const books = await service.find();
        response.status(200).json(books);
    } catch (error) {
        
    }
})

// POST
booksRouter.post('/', validationHandler(CreateBookDto) ,async (request : Request, response : Response, next : NextFunction) => {
    try {
        const body  = request.body;
        const newBook = await service.create(body);

        response.status(201).json({
            status: 201,
            data: newBook
        })
    } catch (error) {
        next(error)
    }
});