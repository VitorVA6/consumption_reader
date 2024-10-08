import ICreateMeasureService from '../../domain/use-cases/create-measure';
import { CreateMeasureReqDto, CreateMeasureResDto } from '../../domain/dtos/measure';
import IMeasureRepository from '../repositories/measure';
import DoubleReportError from '../errors/double-report-error';
import { ImageData } from '../../infra/base64/base64-converter';
import AIManager from '../providers/ai-manager';

export default class CreateMeasureService implements ICreateMeasureService {
  constructor(
    private readonly measure_repository: IMeasureRepository,
    private readonly data_validator: (data: unknown) => CreateMeasureReqDto,
    private readonly baseb4_converter: (data: string) => Promise<ImageData>,
    private readonly ai_manager: AIManager,
  ) {}

  async execute(data: unknown): Promise<CreateMeasureResDto> {
    const measure_data = this.data_validator(data);

    const measure = await this.measure_repository
      .find_by_date_and_type_and_customer(
        measure_data.measure_datetime,
        measure_data.measure_type,
        measure_data.customer_code,
      );

    if (measure) throw new DoubleReportError();

    const image_data = await this.baseb4_converter(measure_data.image);

    const upload_data = await this.ai_manager.upload(image_data.file_path, image_data.mime);

    const text_measure = await this.ai_manager.generate_content(upload_data.uri, upload_data.mime);

    const created_measure = await this.measure_repository.create({
      ...measure_data,
      image_url: upload_data.uri,
      measure_value: Number(text_measure),
      has_confirmed: false,
    });

    return {
      image_url: created_measure.image_url,
      measure_value: created_measure.measure_value,
      measure_uuid: created_measure.measure_uuid,
    };
  }
}
