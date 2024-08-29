import { Request, Response } from 'express';
import IListMeasureService from '../../domain/use-cases/measure/list';
import InvalidTypeError from '../../application/errors/invalid-type-error';

export default class ListMeasureController {
  constructor(
    private readonly listMeasureService: IListMeasureService,
  ) {}

  async handle(req: Request, res: Response) {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    if (measure_type && typeof measure_type !== 'string') throw new InvalidTypeError();

    const measures_data = await this.listMeasureService.execute(customer_code, measure_type);
    return res.status(200).json(measures_data);
  }
}
