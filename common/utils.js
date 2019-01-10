const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtToken = 'mysecretkey';
const crypto = require('crypto');
const secret = 'secretKey';
const regExp = /\S+@\S+\.\S+/;

const jwtCheck = expressjwt({
  secret: jwtToken
});

function getJWTToken(info) {
  return jwt.sign(info, jwtToken, { expiresIn: 60 * 60 })
}

function hashPassword(pass) {
  return crypto.createHmac('sha256', secret)
    .update(pass)
    .digest('hex');
}

function validateEmail(value) {
  return regExp.test(String(value).toLowerCase());
}

function encrypt(value) {

  const key = Buffer(24);
  const iv = Buffer(16);
  const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
  let encrypted = cipher.update(value, 'utf8', 'hex');
  return encrypted += cipher.final('hex');
}

function qualification(teams) {

  const initialTeamsLength = teams.length;
  let result = new Array(Math.floor(initialTeamsLength / 2));
  for (let i = 0; i < initialTeamsLength; i++) {
    let randomTeam = teams.splice(Math.floor(Math.random() * teams.length), 1)[0];
    if (i % 2) {
      result[Math.floor(i / 2)][1] = randomTeam;
    } else {
      result[Math.floor(i / 2)] = [randomTeam];
    }
  }

  return result
}

module.exports = {
  jwtCheck,
  getJWTToken,
  hashPassword,
  validateEmail,
  encrypt,
  qualification
};