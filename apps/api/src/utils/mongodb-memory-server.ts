import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export async function mongoMemoryServerSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  global.__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  await mongoose.connect(`${process.env.MONGO_URI}/musica`);
  await mongoose.connection.db.dropDatabase();
}

export async function mongoMemoryServerTeardown() {
  const instance: MongoMemoryServer = global.__MONGOINSTANCE;
  await mongoose.disconnect();
  await instance.stop();
}
