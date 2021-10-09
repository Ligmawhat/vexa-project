'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Course }) {
      this.hasMany(User, {
        foreignKey: 'countryId'
      });
      this.hasMany(Course, {
        foreignKey: 'countryId'
      });
    }
  };
  Country.init({
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    flagUrl: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};