'use strict';

const { Users } = require('./../../models/index');
const { getJWTToken, hashPassword, validateEmail, encrypt } = require('./../../common/assert');

class User {

  async createUser(req, res) {

    let value = req.body.email;
    let email = encrypt(value);
    let pass = req.body.password;
    let password = hashPassword(pass);

    let user = await Users.findOne({ where: { email } });

    if (!user) {
      if (validateEmail(value)) {
        Users.create({
          email,
          username: req.body.username,
          password
        });
        res.status(200).send('User successfully registered');
      }
      res.status(400).send(`User with email: ${value} is not valid`);
    }
    res.status(400).send(`User with email: ${value} has already been created`);
  }

  async loginUser(req, res) {

    let value = req.body.email;
    let email = encrypt(value);
    let pass = req.body.password;
    let password = hashPassword(pass);

    let user = await Users.findOne({ where: { email } });

    if (user) {
      if (user.password === password) {
        const token = getJWTToken({
          id: user.id,
          username: user.username,
          email: user.email,
        });
        res.header('Authorization', token);
        return res.json(user)
      }
    }
    res.status(400).send(` User is not defined `);
  }

  async removeUser(req, res) {

    let userId = req.params.id;

    let user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(406).send(`User with id ${userId} is not defined`)
    }

    let removedUsers = Users.destroy({ where: { id: userId } });

    if (!removedUsers) {
      return res.status(406).send(` Error `)
    }
   return res.status(200).send(`User with id ${userId} successfully deleted`)
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