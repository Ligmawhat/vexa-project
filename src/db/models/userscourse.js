'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  };
  UsersCourse.init({
    courseId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'UsersCourse',
  });
  return UsersCourse;
};