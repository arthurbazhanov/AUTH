const express = require('express');
const router = express.Router();
const { jwtCheck } = require('./common/assert');
const { UsersDaoHandler, TeamsDaoHandler, TournamentsDaoHandler } = require('./models/handlers');

/**
 * @description Users endpoints
 */
router.post('/registration', (req, res) => UsersDaoHandler.createUser(req, res));
router.post('/login', (req, res) => UsersDaoHandler.loginUser(req, res));
router.get('/status', (req, res) => UsersDaoHandler.getStatus(req, res));
router.get('/resource', (req, res) => UsersDaoHandler.getResource(req, res));
router.get('/resource/status', jwtCheck, (req, res) => UsersDaoHandler.getResourceStatus(req, res));

/**
 * @description Teams endpoints
 */

router.post('/teams', jwtCheck, (req, res) => TeamsDaoHandler.createTeam(req, res));
router.put('/teams/:id', jwtCheck, (req, res) => TeamsDaoHandler.changeNameTeam(req, res));
router.delete('/teams/:id', jwtCheck, (req, res) => TeamsDaoHandler.removeTeam(req, res));
router.get('/teams', jwtCheck, (req, res) => TeamsDaoHandler.getAllTeams(req, res));


/**
 * @description Tournaments endpoints
 */

router.get('/tournaments', jwtCheck, (req, res) => TournamentsDaoHandler.getTournament(req, res));
router.post('/tournaments', jwtCheck, (req, res) => TournamentsDaoHandler.createTournament(req, res));
router.put('/tournaments/:id', jwtCheck, (req, res) => TournamentsDaoHandler.changeNameTournament(req, res));
router.delete('/tournaments/:id', jwtCheck, (req, res) => TournamentsDaoHandler.removeTournament(req, res));
router.post('/tournament/:id', jwtCheck, (req, res) => TournamentsDaoHandler.addTeamToTournaments(req, res));


module.exports = router;


