export default class Memory {
  constructor() {
    this.memory = {};
  }

  set(key, value) {
    return new Promise((resolve) => {
      this.memory[key] = value;
      resolve();
    });
  }

  get(key) {
    return new Promise((resolve) => {
      resolve(this.memory[key]);
    });
  }
}
