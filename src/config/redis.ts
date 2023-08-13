import { createClient } from "redis";

export const redis = createClient();

(async () => {
  await redis.connect();
})();
