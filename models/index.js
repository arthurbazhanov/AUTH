

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../common/Sequelize');

const basename = path.basename(__filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => file.slice(-3) !== '.js')
  .forEach((file) => {
    const pathToLayer = path.join(__dirname, file);

    fs
      .readdirSync(path.join(__dirname, file))
      .filter(schema => schema.indexOf('.') !== 0 && schema !== basename && schema !== 'handler.js' && schema.slice(-3) === '.js')
      .forEach((item) => {
        const model = sequelize.import(path.join(pathToLayer, item));
        db[model.name] = model;
      });

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
