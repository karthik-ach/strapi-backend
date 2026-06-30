/**
 * about-us controller
 */

import { factories } from '@strapi/strapi';
import { toCdnUrl } from '../../../utils/cdn';

export default factories.createCoreController('api::about-us.about-us', ({ strapi }) => ({
  async banner(ctx) {
    const entity = await strapi
      .service('api::about-us.about-us')
      .find({ populate: { title: { populate: { image: true } } } });

    const sanitized = (await this.sanitizeOutput(entity, ctx)) as { title?: Record<string, unknown> } | null;
    const { id, image, ...bannerData } = sanitized?.title ?? {} as any;
    ctx.body = {
      data: {
        ...bannerData,
        image: (image as any[])?.map((img: any) => toCdnUrl(img?.formats?.small?.url ?? img?.url)) ?? [],
      },
    };
  },

  async team(ctx) {
    const entity = await strapi
      .service('api::about-us.about-us')
      .find({ populate: { team: { populate: { photo: true } } } });

    const sanitized = (await this.sanitizeOutput(entity, ctx)) as { team?: Record<string, unknown>[] } | null;
    ctx.body = {
      data: (sanitized?.team ?? []).map(({ id, photo, ...member }) => ({
        ...member,
        photo: toCdnUrl((photo as any)?.formats?.small?.url ?? (photo as any)?.url),
      })),
    };
  },
}));
