import type { Core } from '@strapi/strapi';
import { getRedisClient } from '../utils/redis';

const CACHE_TTL_SECONDS = parseInt(process.env.CACHE_TTL_SECONDS || '60', 10);

export default (_config: unknown, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Only cache GET requests to /api routes
    if (ctx.method !== 'GET' || !ctx.path.startsWith('/api/')) {
      return next();
    }

    const cacheKey = `strapi:cache:${ctx.url}`;
    const redis = getRedisClient();

    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        ctx.set('X-Cache', 'HIT');
        const parsed = JSON.parse(cached);
        ctx.body = { ...parsed, source: 'redis' };
        return;
      }
    } catch (err) {
      // Redis unavailable — fall through to live response
      strapi.log.warn('[response-cache] Redis read failed, serving live:', err.message);
    }

    await next();

    // Only cache successful JSON responses
    if (ctx.status === 200 && ctx.body) {
      try {
        ctx.body = { ...ctx.body, source: 'database' };
        await redis.set(cacheKey, JSON.stringify(ctx.body), 'EX', CACHE_TTL_SECONDS);
        ctx.set('X-Cache', 'MISS');
      } catch (err) {
        strapi.log.warn('[response-cache] Redis write failed:', err.message);
      }
    }
  };
};
