import ICreateMeasureService from '../../../domain/use-cases/measure/create';
import { CreateMeasureReqDto, CreateMeasureResDto } from '../../../domain/dtos/measure';
import IMeasureRepository from '../../repositories/measure';
import DoubleReportError from '../../errors/double-report-error';

export default class CreateMeasureService implements ICreateMeasureService {
  constructor(
    private readonly measure_repository: IMeasureRepository,
    private readonly data_validator: (data: unknown) => CreateMeasureReqDto,
  ) {}

  async execute(data: unknown): Promise<CreateMeasureResDto> {
    const measure_data = this.data_validator(data);

    const measure = await this.measure_repository
      .find_by_date_and_type(measure_data.measure_datetime, measure_data.measure_type);

    if (measure) throw new DoubleReportError();

    const created_measure = await this.measure_repository.create({
      ...measure_data,
      image_url: 'aaa',
      measure_value: 12,
      has_confirmed: false,
    });

    return {
      image_url: created_measure.image_url,
      measure_value: created_measure.measure_value,
      measure_uuid: created_measure.measure_uuid,
    };
  }
}
