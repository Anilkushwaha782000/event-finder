import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI!
let isConnected = false;

async function connectToDatabase() {
  if(isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export default connectToDatabase;
