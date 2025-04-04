
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI must be set");
}

const client = new MongoClient(process.env.MONGODB_URI, {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true // Only for development
});

export const db = client.db('motorcycleapp');

async function connectWithRetry(maxRetries = 5, delay = 5000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err);
      if (i < maxRetries - 1) {
        console.log(`Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error('Failed to connect to MongoDB after multiple attempts');
  console.warn('Application will continue without database connection');
}

connectWithRetry();
