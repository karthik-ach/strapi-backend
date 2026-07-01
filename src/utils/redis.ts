import Redis from 'ioredis';

let client: Redis | null = null;

export function getRedisClient(): Redis {
  if (!client) {
    client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

    client.on('error', (err) => {
      console.error('[redis] connection error:', err.message);
    });
  }
  return client;
}

export async function closeRedisClient(): Promise<void> {
  if (client) { // eslint-disable-line no-lonely-if
    await client.quit();
    client = null;
  }
}

// Deletes all strapi:cache:* keys using SCAN (safe for production).
export async function clearApiCache(): Promise<void> {
  const redis = getRedisClient();
  const pattern = 'strapi:cache:*';
  let cursor = '0';

  do {
    const [next, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
    cursor = next;
    if (keys.length) {
      await redis.del(...keys);
    }
  } while (cursor !== '0');
}
