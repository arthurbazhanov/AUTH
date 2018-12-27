'use strict';

const { Users } = require('./../../models/index');
const { getJWTToken, hashPassword, validateEmail, encrypt } = require('./../../common/assert');

class User {

  createUser(req, res) {

    let value = req.body.email;
    let email = encrypt(value);
    let username = req.body.username;
    let pass = req.body.password;
    let password = hashPassword(pass);

    return Users.findOrCreate({
      where: {
        email,
        username,
        password
      }
    })
      .then(user => {
        if (user[1]) {
          return res.json(user[0])
        }
        res.status(403).send(`User with email: ${value} has already been created`);
      })
  }

  loginUser(req, res) {

    let value = req.body.email;
    let email = encrypt(value);
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
        res.send(` User is not defined `);
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