'use strict';

const { Teams } = require('./../../models/index');

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
}

module.exports = Team;