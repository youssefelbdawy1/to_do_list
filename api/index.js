import app from '../app.js';
import connectDB from '../config/db.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Database connection failed'
      });
    }
  }

  return app(req, res);
}