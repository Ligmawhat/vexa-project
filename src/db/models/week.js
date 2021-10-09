'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Week extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ 
      Course,
      Video, AdditionalFile,
      Phase
    }) {
      // define association here
      this.belongsTo(Course, {
        foreignKey: 'courseId'
      });
      
      this.hasMany(Video, {
        foreignKey: 'weekId'
      });
      this.hasMany(AdditionalFile, {
        foreignKey: 'weekId'
      });

      this.belongsToMany(Phase, {
        through: 'WeeksPhases',
        foreignKey: 'weekId'
      });
    }
  };
  Week.init({
    goals: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    notes: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    number: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    courseId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Week',
  });
  return Week;
};