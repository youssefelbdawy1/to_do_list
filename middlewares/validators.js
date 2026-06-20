import { body } from 'express-validator';

// =============================
// AUTH VALIDATORS
// =============================

const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  body('ID')
    .trim()
    .notEmpty().withMessage('ID is required')
];

const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
];

// =============================
// POST VALIDATORS
// =============================

const createPostValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title cannot be empty'),

  body('content')
    .trim()
    .notEmpty().withMessage('Content cannot be empty'),

  body('date')
    .notEmpty().withMessage('Date is required'),

  body('ID')
    .trim()
    .notEmpty().withMessage('ID is required')
];

const updatePostValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty'),

  body('content')
    .optional()
    .trim()
    .notEmpty().withMessage('Content cannot be empty'),

  body('date')
    .optional()
];

export {
  registerValidator,
  loginValidator,
  createPostValidator,
  updatePostValidator
};