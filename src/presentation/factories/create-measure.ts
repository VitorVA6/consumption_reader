import IMeasureRepository from '../../application/repositories/measure';
import CreateMeasureService from '../../application/services/create-measure';
import ICreateMeasureService from '../../domain/use-cases/create-measure';
import PostgreMeasureRepository from '../../infra/typeorm/repositories/measure';
import create_measure_validator from '../../infra/zod/create-measure-validator';
import CreateMeasureController from '../controllers/create-measure';
import base64_to_file from '../../infra/base64/base64-converter';
import AIManager from '../../application/providers/ai-manager';
import GoogleAIManager from '../../infra/google-generative-ai/google-ai-manager';

export default function create_measure_maker() {
  const measure_repository: IMeasureRepository = new PostgreMeasureRepository();
  const ai_manager: AIManager = new GoogleAIManager();

  const create_measure_service: ICreateMeasureService = new CreateMeasureService(
    measure_repository,
    create_measure_validator,
    base64_to_file,
    ai_manager,
  );

  return new CreateMeasureController(create_measure_service);
}
