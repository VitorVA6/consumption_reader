import IListMeasureService from '../../domain/use-cases/list-measure';
import { ListMeasureResDto } from '../../domain/dtos/measure';
import IMeasureRepository from '../repositories/measure';
import InvalidTypeError from '../errors/invalid-type-error';
import MeasuresNotFoundError from '../errors/measures-not-found-error';

export default class ListMeasureService implements IListMeasureService {
  constructor(
    private readonly measure_repository: IMeasureRepository,
  ) {}

  async execute(customer_code: string, measure_type?: string): Promise<ListMeasureResDto> {
    const measure_type_upper = measure_type ? measure_type.toUpperCase() : undefined;
    if (measure_type_upper !== 'GAS' && measure_type_upper !== 'WATER' && measure_type_upper !== undefined) {
      throw new InvalidTypeError();
    }

    const measures = await this.measure_repository
      .find_by_customer(customer_code, measure_type_upper);

    if (measures.length === 0) throw new MeasuresNotFoundError();

    return {
      customer_code,
      measures,
    };
  }
}
