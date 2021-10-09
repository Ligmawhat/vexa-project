'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersVideosStat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Video, User
    }) {
      // define association here
      this.belongsTo(Video, {
        foreignKey: 'videoId'
      });
      this.belongsTo(User, {
        foreignKey: 'userId'
      });
    }
  };
  UsersVideosStat.init({
    viewed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    videoId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'UsersVideosStat',
  });
  return UsersVideosStat;
};