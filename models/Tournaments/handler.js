'use strict';

const { Tournaments } = require('./../../models/index');

class Tournament {

  createTournament(req, res) {

    let nameTournament = req.body.nameTournament;

    return Tournaments.findOrCreate({ where: { nameTournament: nameTournament } })
      .then(tournament => {
        if(tournament[1]){
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
}

module.exports = Tournament;