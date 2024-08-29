import express, { RequestHandler } from 'express';
import create_measure_maker from '../factories/create-measure';
import update_measure_maker from '../factories/update-measure';
import list_measure_maker from '../factories/list-measure';

const measure_router = express.Router();

measure_router.post('/upload', ((req, res) => create_measure_maker().handle(req, res)) as RequestHandler);
measure_router.patch('/confirm', ((req, res) => update_measure_maker().handle(req, res)) as RequestHandler);
measure_router.get('/:customer_code/list', ((req, res) => list_measure_maker().handle(req, res)) as RequestHandler);

export default measure_router;
