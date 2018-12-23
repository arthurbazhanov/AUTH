'use strict';

const UsersHandler = require('./Users/handler');

module.exports = {
  UsersDaoHandler: new UsersHandler(),
};