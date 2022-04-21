// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

const host = 'https://rancher-test.alfa-bank.kz:30380/';

module.exports = function (app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: host,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    })
  );
};
