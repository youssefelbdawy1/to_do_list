import { validationResult } from 'express-validator';
import AppError from '../utils/appError.js';
import httpstatustext from '../utils/httpstatustext.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    return next(
      new AppError(firstError, 400, httpstatustext.FAIL)
    );
  }

  next();
};

export default validate;