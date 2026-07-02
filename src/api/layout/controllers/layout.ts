/**
 * layout controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::layout.layout', ({ strapi }) => ({
  async navbar(ctx) {
    const entity = await strapi.service('api::layout.layout').find({ populate: { navLinks: true } });
    const sanitized = (await this.sanitizeOutput(entity, ctx)) as {
      navBrand?: string;
      navLinks?: Record<string, unknown>[];
    } | null;

    ctx.body = {
      data: {
        navBrand: sanitized?.navBrand ?? null,
        navLinks: (sanitized?.navLinks ?? []).map(({ id, ...link }: any) => link),
      },
    };
  },

  async footer(ctx) {
    const entity = await strapi.service('api::layout.layout').find();
    const sanitized = (await this.sanitizeOutput(entity, ctx)) as {
      footerLine1?: string;
      footerLine2?: string;
    } | null;

    ctx.body = {
      data: {
        footerLine1: sanitized?.footerLine1 ?? null,
        footerLine2: sanitized?.footerLine2 ?? null,
      },
    };
  },
}));
