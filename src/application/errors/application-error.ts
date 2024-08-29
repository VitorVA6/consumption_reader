class ApplicationError extends Error {
  status: number;

  constructor(status_code: number, error_code: string, error_description: string) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = error_code;

    this.message = error_description;

    this.status = status_code;
  }
}

export default ApplicationError;
