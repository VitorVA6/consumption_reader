export default interface IListMeasureService {
  execute: (client_code: string, measure_type?: 'GAS' | 'WATER') => Promise<void>
}
