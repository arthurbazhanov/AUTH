

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'testshema',
  'postgres',
  'postgres',
  {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(e => console.error('Unable to connect to the database:', e));

module.exports = sequelize;
