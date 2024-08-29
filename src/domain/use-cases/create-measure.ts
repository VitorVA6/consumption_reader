import { CreateMeasureResDto } from '../dtos/measure';

export default interface ICreateMeasureService {
  execute: (data: unknown) => Promise<CreateMeasureResDto>
}
