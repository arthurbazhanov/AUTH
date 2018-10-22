const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

require('./router')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});