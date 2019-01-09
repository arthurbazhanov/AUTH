const express = require('express');
const router = express.Router();
const { jwtCheck } = require('./common/utils');
const { UsersDaoHandler, TeamsDaoHandler, TournamentsDaoHandler } = require('./models/handlers');

/**
 * @description Users endpoints
 */
router.post('/registration', (req, res) => UsersDaoHandler.createUser(req, res));
router.post('/login', (req, res) => UsersDaoHandler.loginUser(req, res));
router.get('/status', (req, res) => UsersDaoHandler.getStatus(req, res));
router.get('/resource', (req, res) => UsersDaoHandler.getResource(req, res));
router.get('/resource/status', jwtCheck, (req, res) => UsersDaoHandler.getResourceStatus(req, res));
router.delete('/user/:id', jwtCheck, (req, res) => UsersDaoHandler.removeUser(req, res));

/**
 * @description Teams endpoints
 */

router.post('/teams', jwtCheck, (req, res) => TeamsDaoHandler.createTeam(req, res));
router.put('/teams/:id', jwtCheck, (req, res) => TeamsDaoHandler.changeNameTeam(req, res));
router.delete('/teams/:id', jwtCheck, (req, res) => TeamsDaoHandler.removeTeam(req, res));
router.get('/teams', jwtCheck, (req, res) => TeamsDaoHandler.getAllTeams(req, res));
router.post('/tournament/team/:id', jwtCheck, (req, res) => TeamsDaoHandler.addTeamToTournaments(req, res));
router.delete('/tournament/team/:id', jwtCheck, (req, res) => TeamsDaoHandler.removeTeamFromTournaments(req, res));
router.get('/qualification', jwtCheck, (req, res) => TeamsDaoHandler.qualificationsTeams(req, res));

/**
 * @description Tournaments endpoints
 */

router.get('/tournaments', jwtCheck, (req, res) => TournamentsDaoHandler.getTournament(req, res));
router.post('/tournaments', jwtCheck, (req, res) => TournamentsDaoHandler.createTournament(req, res));
router.put('/tournaments/:id', jwtCheck, (req, res) => TournamentsDaoHandler.changeNameTournament(req, res));
router.delete('/tournaments/:id', jwtCheck, (req, res) => TournamentsDaoHandler.removeTournament(req, res));

module.exports = router;


