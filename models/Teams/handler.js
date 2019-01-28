

const { Teams, TournamentsTeams, Tournaments } = require('./../../models/index');
const _ = require('lodash');
const { qualification, validateName } = require('./../../common/utils');

const tournamentIndex = 0;
const teamIndex = 1;


class Team {
  async createTeam(req, res) {
    const name = req.body.name;

    if (!validateName(name)) {
      return res.status(400).send('Your team does not have name');
    }

    const team = await Teams.findOne({ where: { name } });

    if (!team) {
      const newTeam = await Teams.create({ name });
      res.json(newTeam);
    }
    res.send(`Team ${name} has already created`);
  }

  async changeNameTeam(req, res) {
    const id = req.params.id;
    const name = req.body.name;

    try {
      const team = await Teams.findByPk(id);

      if (_.isEmpty(team)) {
        return res.status(404).send(`Team with id ${id} not found`);
      }

      if (name === team.name) {
        return res.status(406).send(`Team with name ${name} has already renamed`);
      }

      const newName = await team.update({
        name,
      });
      res.json(newName);
    } catch (err) {
      console.log(err);
    }
  }

  async removeTeam(req, res) {
    const id = req.params.id;

    const team = await Teams.findByPk(id);

    if (_.isEmpty(team)) {
      return res.status(404).send(`Team with id ${id} not found`);
    }

    Teams.destroy({ where: { id } });

    res.send(`Team with id ${id} has removed`);
  }

  async getAllTeams(req, res) {
    try {
      const teams = await Teams.findAll();

      if (_.isEmpty(teams)) {
        return res.status(200).send('Teams has not created yet');
      }

      return res.json(teams);
    } catch (err) {
      console.log(err);
    }
  }

  async addTeamToTournaments(req, res) {
    const tournamentId = req.params.id;
    const teamId = req.body.teamId;

    const result = await Promise.all([

      Tournaments.findByPk(tournamentId),
      Teams.findByPk(teamId),

    ]);

    const tournament = result[tournamentIndex];
    const team = result[teamIndex];

    if (!tournament) {
      return res.status(406).send(` Tournament with id ${tournamentId} not found`);
    }

    if (!team) {
      return res.status(406).send(` Team with id ${teamId} not found`);
    }

    const teamTournament = await TournamentsTeams.findOrCreate({
      where: {
        tournamentId,
        teamId,
      },
    });

    if (!teamTournament[1]) {
      return res.status(406).send(`This team with id ${teamId} has already been added`);
    }
    return res.status(200).send(`This team with id ${teamId} has successfully added`);
  }

  async removeTeamFromTournaments(req, res) {
    const tournamentId = req.params.id;
    const teamId = req.body.teamId;

    const result = await TournamentsTeams.findOne({
      where: {
        tournamentId,
        teamId,
      },
    });

    if (!result) {
      return res.status(406).send(` Team with id ${teamId} or tournament with id ${tournamentId} has not find`);
    }

    const team = await TournamentsTeams.destroy({
      where: {
        tournamentId,
        teamId,
      },
    });
    if (!team) {
      return res.status(406).send('Something error');
    }
    return res.status(200).send(`This team with id ${teamId} has deleted from tournament with id ${tournamentId}`);
  }


  /**
   * @description get all teams and qualify
   * @param req
   * @param res
   * @returns {Promise<void>}
   */

  async qualificationsTeams(req, res) {
    const tournamentId = req.params.id;

    try {
      const tournaments = await Promise.all([

        Tournaments.findOne({ where: { id: tournamentId } }),
        TournamentsTeams.findAll({ where: { tournamentId } }),
      ]);

      const teams = tournaments[1];

      if (!tournaments[0]) {
        return res.status(404).send(`Tournament with id ${tournamentId} not found`);
      }

      const nameTournament = tournaments[0].nameTournament;

      if (!teams) {
        return res.status(404).send('Not teams');
      }

      const idTeams = teams.map(id => id.teamId);

      const names = await Teams.findAll({ where: { id: idTeams } });

      const nameTeams = names.map(name => name.name);

      const result = qualification(nameTeams);

      res.json({ nameTournament, result });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Team;
