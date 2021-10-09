'use strict';

const countries = ['Russia', 'USA', 'Greece'];
const userTypes = ['student', 'contributor'];
const universities = ['MSU', 'MIT'];
const categories = [
  'People & Practices',
  'Sights & Structures',
  'Sports & Leisure',
  'Language & Cusine',
  'Culture & Art',
  'Business Immersion',
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'UserTypes',
      userTypes.map((name) => {
        return {
          name,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      })
    , {});

    await queryInterface.bulkInsert(
      'Countries', 
      countries.map((name) => {
        return {
          name,
          flagUrl: `/images/flags/${name.toLowerCase()}.jpg`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      })
    , {});

    await queryInterface.bulkInsert(
      'Universities',
      universities.map((name) => {
        return {
          name,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      })
    , {});

    await queryInterface.bulkInsert(
      'Categories', 
      categories.map((name) => {
        return {
          name,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      })
    , {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('UserTypes', null, {});
    await queryInterface.bulkDelete('Countries', null, {});
    await queryInterface.bulkDelete('Universities', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
