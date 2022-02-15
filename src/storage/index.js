import Redis from "./redis";
import Memory from "./memory";

export default process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Memory();
