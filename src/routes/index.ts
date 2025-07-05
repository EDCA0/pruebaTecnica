import express, {Application, Router} from 'express';
import { booksRouter } from './booksRouter';


export function routerApi (app : Application) : void {
    const router : Router = express.Router();

    app.use('/v1', router);

    router.use('/books', booksRouter);
}