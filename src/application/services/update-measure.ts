import IUpdateMeasureService from '../../domain/use-cases/update-measure';
import { UpdateMeasureReqDto } from '../../domain/dtos/measure';
import IMeasureRepository from '../repositories/measure';
import MeasureNotFoundError from '../errors/measure-not-found-error';
import ConfirmationDuplicateError from '../errors/confirmation-duplicate-error';

export default class UpdateMeasureService implements IUpdateMeasureService {
  constructor(
    private readonly measure_repository: IMeasureRepository,
    private readonly data_validator: (data: unknown) => UpdateMeasureReqDto,
  ) {}

  async execute(data: unknown): Promise<void> {
    const measure_data = this.data_validator(data);

    const measure = await this.measure_repository.find_by_id(measure_data.measure_uuid);

    if (!measure) throw new MeasureNotFoundError();
    if (measure.has_confirmed) throw new ConfirmationDuplicateError();

    await this.measure_repository.update({
      ...measure,
      measure_value: measure_data.confirmed_value,
    });
  }
}
