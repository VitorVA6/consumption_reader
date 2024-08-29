import IMeasureRepository from '../../application/repositories/measure';
import ListMeasureService from '../../application/services/list-measure';
import IListMeasureService from '../../domain/use-cases/list-measure';
import PostgreMeasureRepository from '../../infra/typeorm/repositories/measure';
import ListMeasureController from '../controllers/list-measure';

export default function list_measure_maker() {
  const measure_repository: IMeasureRepository = new PostgreMeasureRepository();

  const list_measure_service: IListMeasureService = new ListMeasureService(
    measure_repository,
  );

  return new ListMeasureController(list_measure_service);
}
