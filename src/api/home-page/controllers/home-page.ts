/**
 * home-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async hero(ctx) {
    const entity = await strapi.service('api::home-page.home-page').find({ populate: { hero: true } });
    const sanitized = (await this.sanitizeOutput(entity, ctx)) as { hero?: Record<string, unknown> } | null;
    const { id, ...hero } = (sanitized?.hero ?? {}) as any;
    ctx.body = { data: hero };
  },

  async philosophy(ctx) {
    const entity = await strapi.service('api::home-page.home-page').find({ populate: { philosophy: true } });
    const sanitized = (await this.sanitizeOutput(entity, ctx)) as { philosophy?: Record<string, unknown> } | null;
    const { id, ...philosophy } = (sanitized?.philosophy ?? {}) as any;
    ctx.body = { data: philosophy };
  },

  async cta(ctx) {
    const entity = await strapi.service('api::home-page.home-page').find({ populate: { cta: true } });
    const sanitized = (await this.sanitizeOutput(entity, ctx)) as { cta?: Record<string, unknown> } | null;
    const { id, ...cta } = (sanitized?.cta ?? {}) as any;
    ctx.body = { data: cta };
  },

  async workHeading(ctx) {
    const entity = await strapi.service('api::home-page.home-page').find();
    const sanitized = (await this.sanitizeOutput(entity, ctx)) as {
      workEyebrow?: string;
      workHeading?: string;
    } | null;

    ctx.body = {
      data: {
        workEyebrow: sanitized?.workEyebrow ?? null,
        workHeading: sanitized?.workHeading ?? null,
      },
    };
  },

  async teamHeading(ctx) {
    const entity = await strapi.service('api::home-page.home-page').find();
    const sanitized = (await this.sanitizeOutput(entity, ctx)) as {
      teamEyebrowLabel?: string;
      teamHeadingPrefix?: string;
      teamHeadingHighlight?: string;
      teamHeadingSuffix?: string;
    } | null;

    ctx.body = {
      data: {
        teamEyebrowLabel: sanitized?.teamEyebrowLabel ?? null,
        teamHeadingPrefix: sanitized?.teamHeadingPrefix ?? null,
        teamHeadingHighlight: sanitized?.teamHeadingHighlight ?? null,
        teamHeadingSuffix: sanitized?.teamHeadingSuffix ?? null,
      },
    };
  },
}));
