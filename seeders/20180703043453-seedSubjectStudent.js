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
  return queryInterface.bulkInsert('SubjectStudents', [
    {
      SubjectId: 1,
      StudentId: 1,
      createdAt: new Date (),
      updatedAt: new Date (),
    },{
      SubjectId: 1,
      StudentId: 2,
      createdAt: new Date (),
      updatedAt: new Date (),
    },{
      SubjectId: 2,
      StudentId: 4,
      createdAt: new Date (),
      updatedAt: new Date (),
    },{
      SubjectId: 4,
      StudentId: 4,
      createdAt: new Date (),
      updatedAt: new Date (),
    },{
      SubjectId: 3,
      StudentId: 1,
      createdAt: new Date (),
      updatedAt: new Date (),
    }
  ], {})
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
