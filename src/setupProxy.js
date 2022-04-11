// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

const host = 'https://rancher-test.alfa-bank.kz:30001/';

module.exports = function (app) {
  app.use(
    'https://rancher-test.alfa-bank.kz:30380/services-ui/api/get-organizations',
    createProxyMiddleware({
      target: host,
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': ''
      }
    })
  );
};
