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
      createdAt: new Date (),
      updatedAt: new Date ()
    },{
      firstName: 'Vero',
      lastName: 'Cranberry',
      email: 'vero@mail.com',
      SubjectId: 2,
      createdAt: new Date (),
      updatedAt: new Date ()
    },{
      firstName: 'Salem',
      lastName: 'Durothar',
      email: 'salem@mail.com',
      SubjectId: 1,
      createdAt: new Date (),
      updatedAt: new Date ()
    },{
      firstName: 'Linglesou',
      lastName: 'Hex',
      email: 'linglesou@mail.com',
      SubjectId: 3,
      createdAt: new Date (),
      updatedAt: new Date ()
    },{
      firstName: 'Sulfer',
      lastName: 'Handuras',
      email: 'sulfer@mail.com',
      SubjectId: 2,
      createdAt: new Date (),
      updatedAt: new Date ()
    },{
      firstName: 'Baltrix',
      lastName: 'ElderDragon',
      email: 'baltrix@mail.com',
      SubjectId: 1,
      createdAt: new Date (),
      updatedAt: new Date ()
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
