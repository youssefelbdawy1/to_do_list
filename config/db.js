import 'dotenv/config';
import mongoose from 'mongoose';

let cached = global._mongooseConn;

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB Connected');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('DB Connection Error:', error.message);
    throw error;
  }
};

export default connectDB;