const { resolve } = require('path');

module.exports = async (router) => {
  const { createTwigMiddleware } = await import('@pota/twig-server');
  router.use(
    '/component-templates/',
    createTwigMiddleware(resolve(__dirname, '../src/components'), {}),
  );
};
