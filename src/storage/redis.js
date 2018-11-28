import redis from 'redis';

export default class Redis {
  constructor(url) {
    this.client = redis.createClient(url);
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) return reject(err);
        return resolve(value);
      });
    });
  }
}
