import ApplicationError from './application-error';

export default class DoubleReportError extends ApplicationError {
  constructor() {
    super(409, 'DOUBLE_REPORT', 'Leitura do mês já realizada');
  }
}
