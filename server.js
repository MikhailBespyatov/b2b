const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const root = require('path').join(__dirname, 'build');

app.use(express.static(root));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

app.listen(process.env.PORT || 3000);
