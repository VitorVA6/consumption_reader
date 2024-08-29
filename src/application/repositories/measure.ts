import Measure from '../../domain/entities/measure';

export default interface IMeasureRepository {
  create: (data: Omit<Measure, 'measure_uuid'>) => Promise<Measure>
  update: (data: Measure) => Promise<void>
  find_by_id: (measure_uuid: string) => Promise<Measure | null>
  find_by_customer: (customer_code: string) => Promise<Omit<Measure, 'customer_code' | 'measure_value'>>
  find_by_date_and_type: (date: Date, type: 'GAS' | 'WATER') => Promise<Measure | null>
}
