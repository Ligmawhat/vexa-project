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
    static associate({
      UserType, University, Country,
      Video, UsersVideosStat,
      Course
    }) {
      // define association here
      this.belongsTo(UserType, {
        foreignKey: 'userTypeId'
      });
      this.belongsTo(University, {
        foreignKey: 'universityId'
      });
      this.belongsTo(Country, {
        foreignKey: 'countryId'
      });

      this.hasMany(Video, {
        foreignKey: 'authorId'
      });
      this.hasMany(UsersVideosStat, {
        foreignKey: 'userId'
      });

      this.belongsToMany(Course, {
        through: 'UsersCourses',
        foreignKey: 'userId'
      });
      this.belongsToMany(Video, {
        through: UsersVideosStat,
        foreignKey: 'userId'
      });
    }
  };
  User.init({
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    tokens: {
      type: DataTypes.INTEGER
    },
    userpicUrl: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    universityId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    countryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};