import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import error_handler from './presentation/middlewares/error-handler';
import measure_router from './presentation/routes/measure';

const app = express();

app.use(cors());
app.use(express.json());

app.use('', measure_router);

app.use(error_handler);

export default app;
