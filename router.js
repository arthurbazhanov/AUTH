const express = require('express');
const router = express.Router();
const getJWTToken = require('./common/assert')[1];
const jwtCheck = require('./common/assert')[0];
const users = require('./users');

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res
      .sendStatus(400)
      .send(`You need a username and password`);
    return
  }

  const user = users.find((u) => {
    return u.username === req.body.username && u.password === req.body.password
  });

  if (!user) {
    res
      .sendStatus(401)
      .send('User not found');
    return;
  }

  const token = getJWTToken({
    id: user.id,
    username: user.username,
  });

  res.header('Authorization',token ).sendStatus(200);
});

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


