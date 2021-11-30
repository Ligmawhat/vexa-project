'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tokens: {
        type: Sequelize.INTEGER
      },
      userpicUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'UserTypes',
          key: 'id'
        }
      },
      universityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Universities',
          key: 'id'
        }
      },
      countryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Countries',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};