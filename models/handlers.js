'use strict';

const UsersHandler = require('./Users/handler');
const TeamsHandler = require('./Teams/handler');
const TournamentsHandler = require('./Tournaments/handler');

module.exports = {
  UsersDaoHandler: new UsersHandler(),
  TeamsDaoHandler: new TeamsHandler(),
  TournamentsDaoHandler: new TournamentsHandler(),
};