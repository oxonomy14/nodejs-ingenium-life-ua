import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (idName = 'id') => (req, res, next) => {
  const id = req.params[idName];
  if (!isValidObjectId(id)) {
    throw createHttpError(400, `Invalid MongoDB id in param ${idName}`);
  }

  next();
};

