

module.exports = (sequelize, DataTypes) => {
  const Tournaments = sequelize.define('Tournaments', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nameTournament: {
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
    tableName: 'tournaments', timestamps: true,
  });
  return Tournaments;
};
