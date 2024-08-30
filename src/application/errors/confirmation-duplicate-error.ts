import ApplicationError from './application-error';

export default class ConfirmationDuplicateError extends ApplicationError {
  constructor() {
    super(409, 'CONFIRMATION_DUPLICATE', 'Leitura do mês já confirmada');
  }
}
