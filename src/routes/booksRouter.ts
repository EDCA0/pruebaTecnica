import express, { Router, Request, Response, NextFunction } from "express";
import { BookService } from "../services/book.service";

export const booksRouter : Router = express.Router();
const service = new BookService();

// POST
booksRouter.get('/', async (request : Request, response : Response, next : NextFunction) => {
    try {
        const body : any = request.body;
        const newBook = await service.create(body);

        response.status(201).json({
            status: 201,
            data: newBook
        })
    } catch (error) {
        next(error)
    }
});