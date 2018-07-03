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
  return queryInterface.bulkInsert('Teachers', [
    {
      firstName: 'Emon',
      lastName: 'Bullion',
      email: 'emon@mail.com',
      SubjectId: 3,
    },{
      firstName: 'Vero',
      lastName: 'Cranberry',
      email: 'vero@mail.com',
      SubjectId: 2,
    },{
      firstName: 'Salem',
      lastName: 'Durothar',
      email: 'salem@mail.com',
      SubjectId: 1,
    },{
      firstName: 'Linglesou',
      lastName: 'Hex',
      email: 'linglesou@mail.com',
      SubjectId: 3,
    },{
      firstName: 'Sulfer',
      lastName: 'Handuras',
      email: 'sulfer@mail.com',
      SubjectId: 2,
    },{
      firstName: 'Baltrix',
      lastName: 'ElderDragon',
      email: 'baltrix@mail.com',
      SubjectId: 1,
    },{
      firstName: 'Faeryl',
      lastName: 'Viconia',
      email: 'faeryl@mail.com',
      SubjectId: 4,
    },{
      firstName: 'Auric',
      lastName: 'Moor',
      email: 'auric@mail.com',
      SubjectId: 5,
    }], {});
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
