'use strict';

const { Users } = require('./../../models/index');
const getJWTToken = require('./../../common/assert')[1];
const hashPassword = require('./../../common/assert')[2];

class UsersDao {

  createUser(req, res) {

    let email = req.body.email;
    let pass = req.body.password;
    let password = hashPassword(pass);

    return Users.findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          res.sendStatus(200);
          return Users.create({
            email,
            username: req.body.username,
            password,
          });
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

}

module.exports = UsersDao;