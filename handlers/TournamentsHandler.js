

const _ = require('lodash');
const { Tournaments } = require('../db/models');

class Tournament {
  async createTournament(req, res) {
    const nameTournament = req.body.nameTournament;

    const tournament = await Tournaments.findOrCreate({ where: { nameTournament } });

    if (tournament[1]) {
      return res.json(tournament[0]);
    }
    return res.status(403).send(`Tournament with name ${nameTournament} has already been created`);
  }

  async getTournament(req, res) {
    const tournaments = await Tournaments.findAll();

    if (_.isEmpty(tournaments)) {
      return res.status(401).send('Not found tournaments');
    }
    return res.json(tournaments);
  }

  async changeNameTournament(req, res) {
    const id = req.params.id;
    const name = req.body.name;

    const tournament = await Tournaments.findById(id);

    if (_.isEmpty(tournament)) {
      return res.status(401).send(`Team with id ${id} not found`);
    }

    if (tournament.nameTournament === name) {
      return res.status(406).send('This team has already that name');
    }

    const nameTournament = await tournament.update({
      nameTournament: name,
    });

    return res.json(nameTournament);
  }

  async removeTournament(req, res) {
    const id = req.params.id;
    try {
      const tournament = await Tournaments.findByPk(id);

      if (_.isEmpty(tournament)) {
        return res.status(401).send(`Tournament with id ${id} not found`);
      }

      const removedTournament = await Tournaments.destroy({ where: { id } });

      if (!removedTournament) {
        return res.sendStatus(400);
      }

      res.send(`Tournament with id ${id} has removed`);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Tournament;
