import ApplicationError from './application-error';

export default class InvalidTypeError extends ApplicationError {
  constructor() {
    super(400, 'INVALID_TYPE', 'Tipo de medição não permitida');
  }
}
