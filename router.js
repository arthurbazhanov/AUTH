const express = require('express');
const router = express.Router();
const jwtCheck = require('./common/assert')[0];
const { UsersDaoHandler } = require('./models/handlers');

router.post('/registration', (req, res) => UsersDaoHandler.createUser(req, res));
router.post('/login', (req, res) => UsersDaoHandler.loginUser(req, res));

router.get('/status', (req, res) => {
  const localTime = (new Date()).toLocaleTimeString();

  res
    .sendStatus(200)
    .send(`Server time is ${localTime}. `)

});

router.get('/resource', ((req, res) => {
  res
    .sendStatus(200)
    .send('Public page, you can see this');
}));

router.get('/resource/status', jwtCheck, ((req, res) => {
  res
    .sendStatus(200)
    .send('Secret page, you should be logged in to see this');
}));

router.get('*', (req, res) => {

  res.sendStatus(404);

});

module.exports = router;


