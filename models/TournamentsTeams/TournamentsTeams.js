

module.exports = (sequelize, DataTypes) => {
  const TournamentsTeams = sequelize.define('TournamentsTeams', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    tournamentId: {
      type: DataTypes.INTEGER,
      references: 'Tournaments',
      referencesKey: 'id',
    },

    teamId: {
      type: DataTypes.INTEGER,
      references: 'Teams',
      referencesKey: 'id',
    },

    createdAt: {
      type: DataTypes.DATE,
    },

    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'tournamentsteams',
    timestamps: true,
  });

  return TournamentsTeams;
};
