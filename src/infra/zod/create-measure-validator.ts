import { z, ZodError } from 'zod';
import { CreateMeasureReqDto } from '../../domain/dtos/measure';
import InvalidDataError from '../../application/errors/invalid-data-error';

export default function create_measure_validator(data: unknown): CreateMeasureReqDto {
  const zod_schema = z.object({
    image: z.string(),
    customer_code: z.string(),
    measure_datetime: z.coerce.date(),
    measure_type: z.enum(['GAS', 'WATER']),
  });

  try {
    const result = zod_schema.parse(data);
    return result;
  } catch (err) {
    if (err instanceof ZodError) throw new InvalidDataError(err.errors[0].message);
    throw Error();
  }
}
