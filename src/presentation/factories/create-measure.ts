import IMeasureRepository from '../../application/repositories/measure';
import CreateMeasureService from '../../application/services/create-measure';
import ICreateMeasureService from '../../domain/use-cases/create-measure';
import PostgreMeasureRepository from '../../infra/typeorm/repositories/measure';
import create_measure_validator from '../../infra/zod/create-measure-validator';
import CreateMeasureController from '../controllers/create-measure';

export default function create_measure_maker() {
  const measure_repository: IMeasureRepository = new PostgreMeasureRepository();

  const create_measure_service: ICreateMeasureService = new CreateMeasureService(
    measure_repository,
    create_measure_validator,
  );

  return new CreateMeasureController(create_measure_service);
}
