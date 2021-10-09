'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WeeksPhases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phaseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Phases',
          key: 'id'
        }
      },
      weekId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Weeks',
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
    await queryInterface.dropTable('WeeksPhases');
  }
};