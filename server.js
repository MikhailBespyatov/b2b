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

app.use('/404', (req, res) => {
  res.send('404 page not found(test)');
});

app.get('*', (req, res) => {
  res.sendFile('index.html');
});

app.listen(process.env.PORT || 3000);
