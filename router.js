const express = require('express');
const router = express.Router();
const getJWTToken = require('./common/assert')[1];
const jwtCheck = require('./common/assert')[0];
const { Users} = require('./models');

router.post('/registration', (req, res) => {

  let usersInfo = req.body;
  let email = usersInfo.email;

  return Users.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        res.sendStatus(200);
        return Users.create(usersInfo);
      }
      res.send('User has already registered')
    })
});

router.post('/login', (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  return models.Users.findOne({ where: { email } })
    .then(user => {
      if (user) {
        if (user.password === password) {
          const token = getJWTToken({
            username: user.username,
            email: user.email,
          });
          res.header('Authorization', token);
          return res.json(user)
        }
      }
    })
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


