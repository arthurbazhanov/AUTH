'use strict';

const { Users } = require('./../../models/index');
const getJWTToken = require('./../../common/assert')[1];


class UsersDao {

  createUser(req,res) {

    let usersInfo = req.body;
    let email = usersInfo.email;

    return Users.findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          res.sendStatus(200);
          return Users.create(usersInfo);
        }
         res.send('User has already been registered')
      })
  }

  loginUser(req, res) {

    let email = req.body.email;
    let password = req.body.password;

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