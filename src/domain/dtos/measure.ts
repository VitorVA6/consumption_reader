import Measure from '../entities/measure';

export interface CreateMeasureReqDto extends Pick<Measure, 'customer_code' | 'measure_datetime' | 'measure_type'> {
  image: string,
}

export interface CreateMeasureResDto extends Pick<Measure, 'image_url' | 'measure_value' | 'measure_uuid' > {}

export interface UpdateMeasureReqDto extends Pick<Measure, 'measure_uuid'> {
  confirmed_value: number,
}

export interface ListMeasureResDto {
  customer_code: string,
  measures: Omit<Measure, 'customer_code' | 'measure_value'>[]
}
