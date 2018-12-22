'use strict';

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('users', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  }
  {
    tableName: 'users',
      timestamps
  :
    true,

  }
)
  ;
  return Users
};