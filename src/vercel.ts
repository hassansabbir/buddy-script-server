import mongoose from 'mongoose';
import app from './app.js';
import config from './app/config/index.js';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  // Check if mongoose already has a connection
  if (mongoose.connections.length > 0 && mongoose.connections[0].readyState === 1) {
    isConnected = true;
    return;
  }
  try {
    await mongoose.connect(config.database_url as string);
    isConnected = true;
    console.log('MongoDB connected successfully via Vercel Serverless Function.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default async function vercelHandler(req: any, res: any) {
  await connectDB();
  return app(req, res);
}
