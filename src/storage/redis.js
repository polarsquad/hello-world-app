import redis from "redis";

export default class Redis {
  constructor(url) {
    this.client = redis.createClient({ url });
  }

  set(key, value) {
    return this.client.set(key, value);
  }

  get(key) {
    return this.client.get(key);
  }
}
