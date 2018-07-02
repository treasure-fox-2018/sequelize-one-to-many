'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', [
      {
      subjectName: 'Fisika',
      createdAt: new Date,
      updatedAt: new Date
    },{
      subjectName:'Ekonomi',
      createdAt: new Date,
      updatedAt: new Date
    }
  ], {});
},
  

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
