import { createClient } from 'redis';
import dotenv from "dotenv"
const client = createClient({
  password: 'ukp10CI3JBkJMb8Gv4faqWAViMecnvcr',
  socket: {
    host: 'redis-11370.c8.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 11370
  }
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

(async () => {
  try {
    // Connect to Redis
    await client.connect();

    // Example: Setting a key-value pair
    const setResult = await client.set('mykey', 'Hello, Redis!');
    console.log('Set result:', setResult); // Should log 'OK'

    // Example: Getting the value of a key
    const getValue = await client.get('mykey');
    console.log('Get result:', getValue); // Should log 'Hello, Redis!'

  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Closing the connection
    await client.quit();
  }
})();
