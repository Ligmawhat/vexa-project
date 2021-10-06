'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Country, University, UserType }) {
      this.belongsTo(UserType, {
        foreignKey: 'userTypeId'
      });
      this.belongsTo(University, {
        foreignKey: 'universityId'
      });
      this.belongsTo(Country, {
        foreignKey: 'countryId'
      });
    }
  };
  User.init({
    fullName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    userTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    universityId: {
      type: DataTypes.INTEGER
    },
    countryId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};