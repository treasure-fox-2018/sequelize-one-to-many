'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return [queryInterface.changeColumn('Subjects', 'createdAt', {type:Sequelize.DATE, defaultValue: new Date()}),
      queryInterface.changeColumn('Subjects', 'updatedAt', {type:Sequelize.DATE, defaultValue: new Date()}),
      queryInterface.changeColumn('Teachers', 'createdAt', {type:Sequelize.DATE, defaultValue: new Date()}),
      queryInterface.changeColumn('Teachers', 'updatedAt', {type:Sequelize.DATE, defaultValue: new Date()})]
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.dropTable('users');
    */
  }
};
