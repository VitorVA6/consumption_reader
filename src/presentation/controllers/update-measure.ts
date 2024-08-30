import { Request, Response } from 'express';
import IUpdateMeasureService from '../../domain/use-cases/update-measure';

export default class UpdateMeasureController {
  constructor(
    private readonly updateMeasureService: IUpdateMeasureService,
  ) {}

  async handle(req: Request, res: Response) {
    await this.updateMeasureService.execute(req.body);
    return res.status(200).json({
      success: true,
    });
  }
}
