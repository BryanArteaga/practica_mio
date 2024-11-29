import { eq } from 'drizzle-orm';
import { dbMySQL } from './data/db';
import express from 'express';
import {tutor, tutorado, tutoria } from './data/schema'
import routertutorado from './routes/tutorado';
import routertutoria from './routes/tutoria';
import routerUsuario from './routes/usuario';
import validacionMiddleware  from './middleware/auth'
import { routerTransaccion, routertutor } from './routes';



const port: number = 5000;
const app = express();

app.use(express.json());

app.use('/tutor', validacionMiddleware, routertutor);
app.use('/tutorado', validacionMiddleware, routertutorado);
app.use('/tutoria', validacionMiddleware, routertutoria);
app.use('/usuario', routerUsuario);
app.use('/transaccion', routerTransaccion)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export {app}