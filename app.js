import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import httpstatustext from './utils/httpstatustext.js';

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL
  ].filter(Boolean),
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
app.use('/api/posts', postRoutes);

app.use((err, req, res, next) => {
  res.status(err.StatusCode || 500).json({
    status: err.StatusText || httpstatustext.ERROR,
    message: err.message
  });
});

export default app;