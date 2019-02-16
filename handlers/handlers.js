

const UsersHandler = require('./UsersHandler');
const TeamsHandler = require('./TeamHandler');
const TournamentsHandler = require('./TournamentsHandler');

module.exports = {
  UsersDaoHandler: new UsersHandler(),
  TeamsDaoHandler: new TeamsHandler(),
  TournamentsDaoHandler: new TournamentsHandler(),
};
