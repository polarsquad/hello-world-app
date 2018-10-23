export default class Memory {
  constructor() {
    this.memory = {};
  }

  set(key, value) {
    this.memory[key] = value;
  }

  get(key) {
    return this.memory[key];
  }
}
