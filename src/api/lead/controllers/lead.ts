/**
 * lead controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::lead.lead', () => ({
  async create(ctx) {
    await super.create(ctx);
    ctx.body = { message: 'Lead successfully stored' };
  },
}));
