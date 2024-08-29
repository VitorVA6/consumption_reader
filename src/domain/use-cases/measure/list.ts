import { ListMeasureResDto } from '../../dtos/measure';

export default interface IListMeasureService {
  execute: (customer_code: string, measure_type?: string) => Promise<ListMeasureResDto>
}
