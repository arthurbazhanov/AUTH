const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const cors = require('cors');

const app = express();
const router = require('./router');

const PORT = 8080;

app.use(bodyParser.json());
app.use(errorHandler());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});

app.use('/', router);

app.use((err, req, res, next) => {
  if (err.code === 'invalid_token') {
    console.log('Unauthorized');
    res.status(401).send('You have invalid token');
  }

  if (!req.user) {
    res.sendStatus(401);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
