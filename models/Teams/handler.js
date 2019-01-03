'use strict';

const { Teams, TournamentsTeams, Tournaments } = require('./../../models/index');

class Team {

  createTeam(req, res) {

    let name = req.body.name;

    return Teams.findOne({ where: { name: name } })
      .then(team => {
        if (!team) {
          return Teams.create({ where: { name: name } })
            .then(team => res.json(team))
        }
        res.send(`Team ${name} has already created`)
      })
      .catch(err => err)
  }

  changeNameTeam(req, res) {

    let id = req.params.id;
    let name = req.body.name;

    return Teams.findById(id)
      .then(team => {
        return team.update({
          name,
        })
          .then(team => res.json(team));
      })
      .catch(() => res.send(`validation error`))
  }

  removeTeam(req, res) {

    let id = req.params.id;

    return Teams.destroy({ where: { id: id } })
      .then(() => res.send(`Team with id ${id} has removed`))
  }

  getAllTeams(req, res) {

    return Teams.findAll()
      .then(teams => res.json(teams))
  }

  addTeamToTournaments(req, res) {

    let tournamentId = req.params.id;
    let teamId = req.body.teamId;

    return Promise.all([

      Tournaments.findByPk(tournamentId),
      Teams.findByPk(teamId),
    ])
      .then(result => {
        let tournament = result[0];
        let team = result[1];

        if (!tournament || !team) {
          return res.status(406).send(` такого говна нет и в помине`)
        }

        return TournamentsTeams.findOrCreate({
          where: {
            tournamentId,
            teamId
          }
        })
          .then(result => {
            if (!result[1]) {
              return res.status(406).send(`This team with id ${teamId} has already been added`)
            }

            return res.status(200).send(`This team with id ${teamId} has successfully added`)
          })
      })
  }

  removeTeamFromTournaments(req, res) {

    let tournamentId = req.params.id;
    let teamId = req.body.teamId;

    return TournamentsTeams.findOne({
      where: {
        tournamentId,
        teamId
      }
    })
      .then(result => {

        if (!result) {
          return res.status(406).send(` Team with id ${teamId} or tournament with id ${tournamentId} has not find`)
        }

        return TournamentsTeams.destroy({
          where: {
            tournamentId,
            teamId
          }
        })
          .then(result => {
            if (!result) {
              return Promise.reject(406, `dfgf`)
            }
            return res.status(200).send(`This team with id ${teamId} has deleted from tournament with id ${tournamentId}`)
          })
      })

  }
}

module.exports = Team;