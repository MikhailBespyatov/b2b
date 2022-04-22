const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const root = require('path').join(__dirname, 'build');

app.use(express.static(root));

// app.get(
//   '/api/ibk/*',
//   createProxyMiddleware({
//     target: 'https://rancher-test.alfa-bank.kz:30001/',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api/ibk': '/'
//     }
//   })
// );

// app.get(
//   '/api/*',
//   createProxyMiddleware({
//     target: 'https://rancher-test.alfa-bank.kz:30380/',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api': '/'
//     }
//   })
// );

app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});
app.listen(process.env.PORT || 3000);
