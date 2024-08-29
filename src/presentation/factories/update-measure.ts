import IMeasureRepository from '../../application/repositories/measure';
import UpdateMeasureService from '../../application/services/update-measure';
import IUpdateMeasureService from '../../domain/use-cases/update-measure';
import PostgreMeasureRepository from '../../infra/typeorm/repositories/measure';
import update_measure_validator from '../../infra/zod/update-measure-validator';
import UpdateMeasureController from '../controllers/update-measure';

export default function update_measure_maker() {
  const measure_repository: IMeasureRepository = new PostgreMeasureRepository();

  const update_measure_service: IUpdateMeasureService = new UpdateMeasureService(
    measure_repository,
    update_measure_validator,
  );

  return new UpdateMeasureController(update_measure_service);
}
