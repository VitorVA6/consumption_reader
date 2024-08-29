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

export interface ListMeasureDto {
  custome_code: string,
  measures: [
    {
      measure_uuid: string,
      measure_datetime: Date,
      measure_type: string,
      has_confirmed:boolean,
      image_url: string
    },
  ]
}
