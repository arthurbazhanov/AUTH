'use strict';

const { Tournaments, Teams, TournamentsTeams } = require('./../../models/index');

class Tournament {

  createTournament(req, res) {

    let nameTournament = req.body.nameTournament;

    return Tournaments.findOrCreate({ where: { nameTournament: nameTournament } })
      .then(tournament => {
        if (tournament[1]) {
          return res.json(tournament[0])
        }
        res.status(403).send(`Tournament with name ${nameTournament} has already been created`);
      });
  }

  getTournament(req, res) {

    Tournaments.findAll()
      .then(tournaments => res.json(tournaments))

  }

  changeNameTournament(req, res) {

    let id = req.params.id;
    let name = req.body.name;

    return Tournaments.findById(id)
      .then(tournaments => {
        return tournaments.update({
          name,
        })
          .then(tournaments => res.json(tournaments));
      })
      .catch(() => res.send(`validation error`))
  }

  removeTournament(req, res) {

    let id = req.params.id;

    return Tournaments.destroy({ where: { id: id } })
      .then(() => res.send(`Team with id ${id} has removed`))
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
}

module.exports = Tournament;