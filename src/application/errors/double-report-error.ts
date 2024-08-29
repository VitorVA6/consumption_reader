import ApplicationError from './application-error';

export default class DoubleReportError extends ApplicationError {
  constructor() {
    super(409, 'INVALID_DATA', 'Leitura do mês já realizada');
  }
}
