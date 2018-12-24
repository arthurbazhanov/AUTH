const express = require('express');
const router = express.Router();
const jwtCheck = require('./common/assert')[0];
const { UsersDaoHandler } = require('./models/handlers');

router.post('/registration', (req, res) => UsersDaoHandler.createUser(req, res));
router.post('/login', (req, res) => UsersDaoHandler.loginUser(req, res));
router.get('/status', (req, res) => UsersDaoHandler.getStatus(req, res));
router.get('/resource', (req, res) => UsersDaoHandler.getResource(req, res));
router.get('/resource/status', jwtCheck, (req, res) => UsersDaoHandler.getResourceStatus(req, res));

module.exports = router;


