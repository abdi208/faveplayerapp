'use strict';
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define('player', {
    sport: DataTypes.STRING,
    lastName: DataTypes.STRING,
    position: DataTypes.STRING,
    jerseyNumber: DataTypes.INTEGER
  }, {});
  player.associate = function(models) {
    // associations can be defined here
  };
  return player;
};