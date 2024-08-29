import { NextFunction, Request, Response } from 'express';
import ApplicationError from '../../application/errors/application-error';

const error_handler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);
  if (error instanceof ApplicationError) {
    return res.status(error.status).json({
      error_code: error.name,
      error_description: error.message,
    });
  }
  console.log(error);
  return res.status(500).json({
    error_code: 'InternalError',
    error_description: 'Ocorreu um erro no servidor, tente mais tarde',
  });
};

export default error_handler;
