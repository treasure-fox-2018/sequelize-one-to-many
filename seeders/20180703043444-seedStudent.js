'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  return queryInterface.bulkInsert('Students', [
    {
    firstName: 'Finn',
    lastName: 'Finner',
    email: 'finn@mail.com'
    },{
      firstName: 'Dum',
      lastName: 'Dum',
      email: 'dum@mail.com'
    },{
      firstName: 'Aggron',
      lastName: 'StoneBreaker',
      email: 'aggron@mail.com'
    },{
      firstName: 'Gilden',
      lastName: 'Silveric',
      email: 'gilden@mail.com'
    },{
      firstName: 'Losha',
      lastName: 'Vallas',
      email: 'losha@mail.com'
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
