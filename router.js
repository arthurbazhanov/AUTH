const getJWTToken = require('./common/assert')[1];
const jwtCheck = require('./common/assert')[0];

const users = [
  {id:1, username: "admin", password: "admin" },
  {id:2, username: "guest", password: "guest" }
];

module.exports = (app) => {

  app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password){
      res
        .status(400)
        .send(`You need a username and password`);
      return
    }

    const user = users.find((u) => {
      return u.username === req.body.username && u.password ===  req.body.password
    });

    if(!user) {
      res
        .status(401)
        .send('User not found');
      return;
    }

    const token = getJWTToken({
      id: user.id,
      username: user.username,
    });

    res
      .status(200)
      .send({access_token: token});
  });

  app.get('/status', (req, res) => {
    const localTime = (new Date()).toLocaleTimeString();

    res
      .status(200)
      .send(`Server time is ${localTime}. `)

  });

  app.get('/resource', ((req, res)=> {
    res
      .status(200)
      .send('Public page, you can see this');
  }));

  app.get('/resource/status', jwtCheck, ((req, res)=> {
    res
      .status(200)
      .send('Secret page, you should be logged in to see this');
  }));

  app.get('*', (req,res) => {

    res.sendStatus(404);

  });

};