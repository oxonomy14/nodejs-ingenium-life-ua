//import { HttpError } from 'http-errors';
import isHttpError from 'http-errors';
export const errorHandler = (err, req, res, next) => {

    

    if (isHttpError(err)) {
        res.status(err.status).json({
          status: err.status,
          message: err.message,
          data: err,
        });
        return;
      }
    
    // Middleware для обробки помилок 
    res.status(500).json({
    status: 500,    
    message: 'Something went wrong',
    data: err.message,
    });
};

