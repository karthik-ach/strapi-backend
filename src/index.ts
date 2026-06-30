import type { Core } from '@strapi/strapi';
import { getRedisClient, closeRedisClient, clearApiCache } from './utils/redis';

export default {
  register() {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    getRedisClient();

    // Clear the full API cache after any content write so responses never go stale.
    strapi.db.lifecycles.subscribe({
      afterCreate:       () => clearApiCache(),
      afterCreateMany:   () => clearApiCache(),
      afterUpdate:       () => clearApiCache(),
      afterUpdateMany:   () => clearApiCache(),
      afterDelete:       () => clearApiCache(),
      afterDeleteMany:   () => clearApiCache(),
    });
  },

  async destroy() {
    await closeRedisClient();
  },
};
