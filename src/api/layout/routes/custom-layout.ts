export default {
  routes: [
    {
      method: 'GET' as const,
      path: '/layout/navbar',
      handler: 'layout.navbar',
      config: {},
    },
    {
      method: 'GET' as const,
      path: '/layout/footer',
      handler: 'layout.footer',
      config: {},
    },
  ],
};
