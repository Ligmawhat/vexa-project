'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Week }) {
      this.hasMany(Week, {
        foreignKey: 'phaseId'
      });
    }
  };
  Phase.init({
    number: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Phase',
  });
  return Phase;
};