import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.log('Redis client not connected to the server:', err);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });

    this.connected = false;

    this.client.connect()
      .then(() => {
        this.connected = true;
      })
      .catch(() => {
        this.connected = false;
      });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    const value = await this.client.get(key);
    return value ?? null;
  }

  async set(key, value, duration) {
    if (duration) {
      await this.client.setEx(key, duration, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
