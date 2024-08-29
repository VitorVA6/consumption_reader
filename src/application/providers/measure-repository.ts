import Measure from '../../domain/entities/measure';

export default interface MeasureRepository {
  create: (data: Omit<Measure, 'measure_uuid'>) => Promise<Measure>
  update: (data: Measure) => Promise<void>
  findById: (measure_uuid: string) => Promise<Measure>
  findByCustomer: (customer_code: string) => Omit<Measure, 'customer_code' | 'measure_value'>
}
