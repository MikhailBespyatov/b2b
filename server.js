const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const root = require('path').join(__dirname, 'build');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(root));

app.get(
  '/b2b/ibk/*',
  createProxyMiddleware({
    target: 'https://rancher-test.alfa-bank.kz:30001/',
    changeOrigin: true,
    pathRewrite: {
      '^/b2b/ibk': '/'
    }
  })
);

app.get(
  '/ibk/*',
  createProxyMiddleware({
    target: 'https://rancher-test.alfa-bank.kz:30001/',
    changeOrigin: true,
    pathRewrite: {
      '^/ibk': '/'
    }
  })
);

app.use('/404', (req, res) => {
  res.send('404 page not found(test)');
});
app.use('/b2b/404', (req, res) => {
  res.send('404 page not found(test2)');
});

app.get('*', (req, res) => {
  res.send('server started');
  // res.sendFile('index.html', { root });
});

app.listen(process.env.PORT || 3000);
