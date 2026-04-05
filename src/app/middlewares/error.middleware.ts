import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: any[] = [];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errorSources = err.issues.map((issue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    });
  } else if (err?.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID';
    errorSources = [{ path: '', message: err.message }];
  } else if (err?.code === 11000) {
    statusCode = 400;
    message = 'Duplicate Entry';
    errorSources = [{ path: '', message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: '', message: err.message }];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
