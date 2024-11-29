import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { tutorRouter } from './routes/tutor';
import { tutoriaRouter } from './routes/tutoria';
import { tutoradoRouter } from './routes/tutorado';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const BASE_URL = '/api/v1';

// Integrar las rutas
app.use(`${BASE_URL}/tutor`, tutorRouter);
app.use(`${BASE_URL}/tutorado`, tutoradoRouter);
app.use(`${BASE_URL}/tutorias`, tutoriaRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}${BASE_URL}`);
});