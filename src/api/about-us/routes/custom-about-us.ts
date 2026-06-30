export default {
  routes: [
    {
      method: 'GET' as const,
      path: '/about-us/banner',
      handler: 'about-us.banner',
      config: {},
    },
    {
      method: 'GET' as const,
      path: '/about-us/team',
      handler: 'about-us.team',
      config: {},
    },
  ],
};
