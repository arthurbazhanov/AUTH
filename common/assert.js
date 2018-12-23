const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtToken = 'mysecretkey';
const crypto = require('crypto');
const secret = 'secretKey';

const jwtCheck = expressjwt({
  secret: jwtToken
});

function getJWTToken (info) {
  return jwt.sign(info, jwtToken, {expiresIn: 60*60})
}

function hashPassword(pass){
  return crypto.createHmac('sha256', secret)
    .update(pass)
    .digest('hex');
}

module.exports = [jwtCheck, getJWTToken, hashPassword];