import ApplicationError from './application-error';

export default class MeasureNotFoundError extends ApplicationError {
  constructor() {
    super(404, 'MEASURE_NOT_FOUND', 'Leitura do mês não encontrada');
  }
}
