const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtToken = 'mysecretkey';

const jwtCheck = expressjwt({
  secret: jwtToken
});

function getJWTToken (info) {
  return jwt.sign({info }, jwtToken, {expiresIn: 60*60})
}

module.exports = [jwtCheck, getJWTToken];