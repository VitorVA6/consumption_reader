import { Request, Response } from 'express';
import ICreateMeasureService from '../../domain/use-cases/measure/create';

export default class CreateMeasureController {
  constructor(
    private readonly createMeasureService: ICreateMeasureService,
  ) {}

  async handle(req: Request, res: Response) {
    const measure_data = await this.createMeasureService.execute(req.body);
    return res.status(200).json(measure_data);
  }
}
