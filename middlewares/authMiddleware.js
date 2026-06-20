import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/appError.js';
import httpstatustext from '../utils/httpstatustext.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(
        new AppError("Not authorized, no token", 401, httpstatustext.FAIL)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(
        new AppError("User not found", 401, httpstatustext.FAIL)
      );
    }

    req.user = user;
    next();

  } catch (error) {
    return next(
      new AppError("Invalid or expired token", 401, httpstatustext.FAIL)
    );
  }
};