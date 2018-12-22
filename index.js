const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./router');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use((req,res, next) => {
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});