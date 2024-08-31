import { createClient } from 'redis';
import dotenv from "dotenv"
dotenv.config();
const client = createClient({
  password: process.env.PASSWORD,
  socket: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT)
  }
});

client.on('connect',async () => {
  console.log('Connected to Redis');
}
);

client.on('end', () => {
  console.log('Redis client disconnected');
});

client.on('reconnecting', () => {
  console.log('Reconnecting to Redis...');
});

client.on('dataAccessed', (info) => {
  console.log(`Data accessed: ${info.operation} key: ${info.key}`, info.data || info.value);
});

client.on('error', async (err) => {
  console.error('Redis error:', err);
  if (!client.isOpen) {
    console.log('Attempting to reconnect to Redis...');
    await client.connect().catch((err) => console.error('Redis reconnection failed:', err));
  }
});

export default client;
