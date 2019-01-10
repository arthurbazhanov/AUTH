'use strict';

const { Teams, TournamentsTeams, Tournaments } = require('./../../models/index');
const _ = require('lodash');
const { qualification, validateTeamName } = require('./../../common/utils');

class Team {

  async createTeam(req, res) {

    let name = req.body.name;

    if(!validateTeamName(name)){
      return res.status(400).send(`Your team does not have name`)
    }

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


  /**
   * @description get all teams and qualify
   * @param req
   * @param res
   * @returns {Promise<void>}
   */

  async qualificationsTeams(req, res) {

    let tournamentId = req.params.id;

    try {

      let tournaments = await Promise.all([

        Tournaments.findOne({ where: { id: tournamentId } }),
        TournamentsTeams.findAll({ where: { tournamentId } }),
      ]);

      let teams = tournaments[1];

      if (!tournaments[0]) {
        return res.status(404).send(`Tournament with id ${tournamentId} not found`)
      }

      let nameTournament = tournaments[0].nameTournament;

      if(!teams) {
        return res.status(404).send(`Not teams`)
      }

      let idTeams = teams.map(id => {
        return id.teamId;
      });

      let names = await Teams.findAll({ where: { id: idTeams } });

      let nameTeams = names.map(name => {
        return name.name;
      });

      let result = qualification(nameTeams);

      res.json({ nameTournament, result });
    } catch (err) {
      console.log(err)
    }

  }
}

module.exports = Team;