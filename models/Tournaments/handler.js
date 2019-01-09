'use strict';

const _ = require('lodash');
const { Tournaments } = require('./../../models/index');

class Tournament {

  async createTournament(req, res) {

    let nameTournament = req.body.nameTournament;

    let tournament = await Tournaments.findOrCreate({ where: { nameTournament: nameTournament } });

    if (tournament[1]) {
      return res.json(tournament[0])
    }
    return res.status(403).send(`Tournament with name ${nameTournament} has already been created`);
  }

  async getTournament(req, res) {

    let tournaments = await Tournaments.findAll();

    if (_.isEmpty(tournaments)) {
      return res.status(401).send('Not found tournaments')
    }
    return res.json(tournaments)
  }

  async changeNameTournament(req, res) {

    let id = req.params.id;
    let name = req.body.name;

    let tournament = await Tournaments.findById(id);

    if (_.isEmpty(tournament)) {
      return res.status(401).send(`Team with id ${id} not found`)
    }

    if (tournament.nameTournament === name) {
      return res.status(406).send(`This team has already that name`)
    }

    let nameTournament = await tournament.update({
      nameTournament: name
    });

    return res.json(nameTournament)
  }

  async removeTournament(req, res) {

    let id = req.params.id;
    try {
      let tournament = await Tournaments.findByPk(id);

      if (_.isEmpty(tournament)) {
        return res.status(401).send(`Tournament with id ${id} not found`)
      }

      await Tournaments.destroy({ where: { id: id } });
      res.send(`Tournament with id ${id} has removed`)
    } catch (err) {
      console.log(err)
    }

  }

}

module.exports = Tournament;