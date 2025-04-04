
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI must be set");
}

const client = new MongoClient(process.env.MONGODB_URI);
export const db = client.db('motorcycleapp');

client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  throw err;
});
