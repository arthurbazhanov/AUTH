const express = require('express');
const router = express.Router();
const { jwtCheck } = require('./common/assert');
const { UsersDaoHandler, TeamsDaoHandler } = require('./models/handlers');

/**
 * @description Users endpoints
 */
router.post('/registration', (req, res) => UsersDaoHandler.createUser(req, res));
router.post('/login', (req, res) => UsersDaoHandler.loginUser(req, res));
router.get('/status', (req, res) => UsersDaoHandler.getStatus(req, res));
router.get('/resource', (req, res) => UsersDaoHandler.getResource(req, res));
router.get('/resource/status',jwtCheck, (req, res) => UsersDaoHandler.getResourceStatus(req, res));

/**
 * @description Teams endpoints
 */

router.post('/teams', jwtCheck, (req,res) => TeamsDaoHandler.createTeam(req, res));
router.put('/teams/:id', jwtCheck, (req,res) => TeamsDaoHandler.changeNameTeam(req, res));
router.delete('/teams/:id', jwtCheck, (req,res) => TeamsDaoHandler.removeTeam(req, res));

module.exports = router;


