const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/services-ui/api/get-organizations',
    createProxyMiddleware({
      target: 'https://rancher-test.alfa-bank.kz:30001',
      changeOrigin: true
    })
  );
};
