export interface CreateMeasureDto {
  image: string,
  customer_code: string,
  measure_datetime: string,
  measure_type: 'WATER' | 'GAS'
}

export interface UpdateMeasureDto {
  measure_uuid: string,
  confirmed_value: number,
}

