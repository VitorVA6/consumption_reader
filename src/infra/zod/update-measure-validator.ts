import { z, ZodError } from 'zod';
import { UpdateMeasureReqDto } from '../../domain/dtos/measure';
import InvalidDataError from '../../application/errors/invalid-data-error';

export default function update_measure_validator(data: unknown): UpdateMeasureReqDto {
  const zod_schema = z.object({
    measure_uuid: z.string().uuid(),
    confirmed_value: z.number().int(),
  });

  try {
    const result = zod_schema.parse(data);
    return result;
  } catch (err) {
    if (err instanceof ZodError) throw new InvalidDataError(err.errors[0].message);
    throw Error();
  }
}
