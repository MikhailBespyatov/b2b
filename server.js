const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/build')));

app.use(
  '/api/ibk*',
  createProxyMiddleware({
    target: 'https://rancher-test.alfa-bank.kz:30001/',
    changeOrigin: true,
    pathRewrite: {
      '^/api/ibk': '/'
    }
  })
);

app.use(
  '/api/*',
  createProxyMiddleware({
    target: 'https://rancher-test.alfa-bank.kz:30380/',
    changeOrigin: true,
    pathRewrite: {
      '^/api/': '/'
    }
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
