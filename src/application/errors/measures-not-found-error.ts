import ApplicationError from './application-error';

export default class MeasuresNotFoundError extends ApplicationError {
  constructor() {
    super(404, 'MEASURES_NOT_FOUND', 'Nenhuma leitura encontrada');
  }
}
