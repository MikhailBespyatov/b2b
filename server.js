const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const root = require('path').join(__dirname, 'build');

app.get(
  '/api/ibk/*',
  createProxyMiddleware({
    target: 'https://rancher-test.alfa-bank.kz:30001/',
    changeOrigin: true,
    pathRewrite: {
      '^/api/ibk': '/'
    }
  })
);

app.get(
  '/api/*',
  createProxyMiddleware({
    target: 'https://rancher-test.alfa-bank.kz:30380/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  })
);
app.disable('x-powered-by');
app.set('port', 8080);
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(root));
app.get('*', (req, res) => {
  res.sendFile('index.html');
});
app.listen(process.env.PORT || 3000);
