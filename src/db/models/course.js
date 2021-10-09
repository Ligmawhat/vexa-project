'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Country,
      Week,
      User
    }) {
      this.belongsTo(Country, {
        foreignKey: 'countryId'
      });

      this.hasMany(Week, {
        foreignKey: 'courseId'
      });

      this.belongsToMany(User, {
        through: 'UsersCourses',
        foreignKey: 'courseId'
      });
    }
  };
  Course.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    countryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};