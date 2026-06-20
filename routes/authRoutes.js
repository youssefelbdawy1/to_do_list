import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { registerValidator, loginValidator } from '../middlewares/validators.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', protect, logout);

export default router;