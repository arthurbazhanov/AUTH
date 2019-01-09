'use strict';

const { Teams, TournamentsTeams, Tournaments } = require('./../../models/index');
const _ = require('lodash');

class Team {

  async createTeam(req, res) {

    let name = req.body.name;

    let team = await Teams.findOne({ where: { name: name } });

    if (!team) {
      let newTeam = await Teams.create({ name: name });
      res.json(newTeam)
    }
    res.send(`Team ${name} has already created`);
  }

  async changeNameTeam(req, res) {

    let id = req.params.id;
    let name = req.body.name;

    try {
      let team = await Teams.findByPk(id);

      if (_.isEmpty(team)) {
        return res.status(404).send(`Team with id ${id} not found`)
      }

      if (name === team.name) {
        return res.status(406).send(`Team with name ${name} has already renamed`)
      }

      let newName = await team.update({
        name,
      });
      res.json(newName);
    }
    catch (err) {
      console.log(err)
    }
  }

  async removeTeam(req, res) {

    let id = req.params.id;

    let team = await Teams.findByPk(id);

    if (_.isEmpty(team)) {
      return res.status(404).send(`Team with id ${id} not found`)
    }

    Teams.destroy({ where: { id: id } });

    res.send(`Team with id ${id} has removed`);
  }

  async getAllTeams(req, res) {

    try {
      let teams = await Teams.findAll();

      if (_.isEmpty(teams)) {
        return res.status(200).send(`Teams has not created yet`)
      }

      return res.json(teams)

    } catch (err) {
      console.log(err)
    }

  }

  async addTeamToTournaments(req, res) {

    let tournamentId = req.params.id;
    let teamId = req.body.teamId;

    let result = await Promise.all([

      Tournaments.findByPk(tournamentId),
      Teams.findByPk(teamId),

    ]);

    let tournament = result[0];
    let team = result[1];

    if (!tournament) {
      return res.status(406).send(` Tournament with id ${tournamentId} not found`)
    }

    if (!team) {
      return res.status(406).send(` Team with id ${teamId} not found`)
    }

    let teamTournament = await TournamentsTeams.findOrCreate({
      where: {
        tournamentId,
        teamId
      }
    });

    if (!teamTournament[1]) {
      return res.status(406).send(`This team with id ${teamId} has already been added`)
    }
    return res.status(200).send(`This team with id ${teamId} has successfully added`)
  }

  async removeTeamFromTournaments(req, res) {

    let tournamentId = req.params.id;
    let teamId = req.body.teamId;

    let result = await TournamentsTeams.findOne({
      where: {
        tournamentId,
        teamId
      }
    });

    if (!result) {
      return res.status(406).send(` Team with id ${teamId} or tournament with id ${tournamentId} has not find`)
    }

    let team = await TournamentsTeams.destroy({
      where: {
        tournamentId,
        teamId
      }
    });
    if (!team) {
      return res.status(406).send(`Something error`)
    }
    return res.status(200).send(`This team with id ${teamId} has deleted from tournament with id ${tournamentId}`)
  }

  async qualificationsTeams(req, res) {
    try {
      let allTeams = await Teams.findAll();

      let nameTeams = allTeams.map(name => {
        return name.name;
      });

      const initialTeamsLength = nameTeams.length;
      let result = new Array(Math.floor(initialTeamsLength / 2));
      for (let i = 0; i < initialTeamsLength; i++) {
        let randomTeam = nameTeams.splice(Math.floor(Math.random() * nameTeams.length), 1)[0];
        if (i % 2) {
          result[Math.floor(i / 2)][1] = randomTeam;
        } else {
          result[Math.floor(i / 2)] = [randomTeam];
        }
      }
      res.json(result)
    } catch (err) {
      console.log(err)
    }

  }
}

module.exports = Team;