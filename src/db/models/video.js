'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User, Category, Week,
      UsersVideosStat
    }) {
      // define association here
      this.belongsTo(Category, {
        foreignKey: 'categoryId'
      });
      this.belongsTo(Week, {
        foreignKey: 'weekId'
      });
      
      this.hasMany(UsersVideosStat, {
        foreignKey: 'videoId'
      });
        
      this.belongsTo(User, {
        foreignKey: 'authorId'
      });

      this.belongsToMany(User, {
        through: UsersVideosStat,
        foreignKey: 'videoId'
      });
    }
  };
  Video.init({
    url: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    thumbUrl: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    subtitle: {
      type: DataTypes.STRING
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    weekId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    authorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};