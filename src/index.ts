import 'reflect-metadata';
import express, {Request, Response} from 'express';
import {routerApi} from './routes';

const app = express();
const port : number = 3000;  //> 3000 por default para pruebas

app.use(express.json());

routerApi(app);

//> En caso de ir a un Endpoint No declarado
app.use((request : Request, response : Response) => {
    response.status(404).json({
        message : 'Endpoint not found',
    });
});

//> Escucha al puerto 
app.listen(port, () => {
    console.log('Mi port ', port);
})