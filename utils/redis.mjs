import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.on('connect', () => console.log('Redis Client Connected'));
    this.client.connect();
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    const value = await this.client.get(key);
    if (value) {
      return value;
    }
    return null;
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

export default RedisClient;
