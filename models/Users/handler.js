'use strict';

const { Users } = require('./../../models/index');
const { getJWTToken, hashPassword, validateEmail, encrypt } = require('./../../common/assert');

class User {

  createUser(req, res) {

    let value = req.body.email;
    let email = encrypt(value);
    let pass = req.body.password;
    let password = hashPassword(pass);

    return Users.findOne({ where: { email: email } })
      .then(user => {
        if (!user) {

          if (validateEmail(email)) {
            return Users.create({
              email,
              username: req.body.username,
              password,
            })
              .then(user => res.json(user));
          }
          res.send(`Your email ${value} is invalid`)

        }
        res.send('User has already been registered')
      })
  }

  loginUser(req, res) {

    let email = req.body.email;
    let pass = req.body.password;
    let password = hashPassword(pass);

    return Users.findOne({ where: { email } })
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
  }

  getStatus(req, res) {
    const localTime = (new Date()).toLocaleTimeString();

    res
      .send(`Server time is ${localTime}. `)
  }

  getResource(req, res) {
    res
      .send('Public page, you can see this');
  }

  getResourceStatus(req, res) {
    res
      .send('Secret page, you should be logged in to see this');
  }

}

module.exports = User;