

module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define('Teams', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
    },

    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'teams', timestamps: true,
  });
  return Teams;
};
