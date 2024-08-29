export default interface Measure {
  measure_uuid: string,
  measure_value: number,
  measure_type: 'GAS' | 'WATER',
  measure_datetime: Date,
  has_confirmed: boolean,
  image_url: string,
  customer_code: string,
}
