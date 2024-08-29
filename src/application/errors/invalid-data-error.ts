import ApplicationError from './application-error';

export default class InvalidDataError extends ApplicationError {
  constructor(description_error: string) {
    super(400, 'INVALID_DATA', description_error);
  }
}
