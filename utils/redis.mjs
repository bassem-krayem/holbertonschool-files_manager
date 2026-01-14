import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });

    this.client.on('error', (err) => {
      console.log('Redis client not connected to the server:', err);
    });
  }

  isAlive() {
    return this.client.connected === true;
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }

  set(key, value, duration) {
    return new Promise((resolve, reject) => {
      if (duration) {
        this.client.setex(key, duration, value, (err) => {
          if (err) reject(err);
          resolve();
        });
      } else {
        this.client.set(key, value, (err) => {
          if (err) reject(err);
          resolve();
        });
      }
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
