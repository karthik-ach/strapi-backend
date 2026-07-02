export default {
  routes: [
    {
      method: 'GET' as const,
      path: '/home-page/hero',
      handler: 'home-page.hero',
      config: {},
    },
    {
      method: 'GET' as const,
      path: '/home-page/philosophy',
      handler: 'home-page.philosophy',
      config: {},
    },
    {
      method: 'GET' as const,
      path: '/home-page/cta',
      handler: 'home-page.cta',
      config: {},
    },
    {
      method: 'GET' as const,
      path: '/home-page/work-heading',
      handler: 'home-page.workHeading',
      config: {},
    },
    {
      method: 'GET' as const,
      path: '/home-page/team-heading',
      handler: 'home-page.teamHeading',
      config: {},
    },
  ],
};
