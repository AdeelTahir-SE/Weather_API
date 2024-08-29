import { createClient } from 'redis';

const client = createClient({
  username: "default",
  password: 'ukp10CI3JBkJMb8Gv4faqWAViMecnvcr',
  socket: {
    host: 'redis-11370.c8.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 11370
  }
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

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
