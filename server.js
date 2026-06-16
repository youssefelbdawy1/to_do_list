import dotenv from 'dotenv';
dotenv.config(); // ✅ must be before any other import that needs env vars

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import httpstatustext from './utils/httpstatustext.js';

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted.com"],
    },
  },
}));

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.use((err, req, res, next) => {
  res.status(err.StatusCode || 500).json({
    status: err.StatusText || httpstatustext.ERROR,
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;

// ✅ DB first, then server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});