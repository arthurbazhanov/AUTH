'use strict';

const UsersHandler = require('./Users/handler');
const TeamsHandler = require('./Teams/handler');

module.exports = {
  UsersDaoHandler: new UsersHandler(),
  TeamsDaoHandler: new TeamsHandler(),
};