import mongoose from 'mongoose';

let isConnected = false;

export async function connectMongoDB() {
  if (isConnected) {
    return mongoose.connection;
  }

  const mongoUrl = process.env.DATABASE_URL;
  if (!mongoUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  try {
    await mongoose.connect(mongoUrl, {
      retryWrites: true,
      w: 'majority',
    });
    isConnected = true;
    console.log('[MongoDB] Connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('[MongoDB] Connection failed:', error);
    throw error;
  }
}

export async function disconnectMongoDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[MongoDB] Disconnected');
  }
}

export function getMongoose() {
  return mongoose;
}
