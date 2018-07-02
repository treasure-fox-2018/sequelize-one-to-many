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
      {firstName:'Bambang', lastName:'Supaptro', email:'bambangsuprapto@sekolah.id', SubjectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {firstName:'Rukmana', lastName:'Fatmawati', email:'rukmanafatmawati@sekolah.id', SubjectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {firstName:'Butet', lastName:'Naborhu', email:'butetnaborhu@sekolah.id', SubjectId: 1, createdAt: new Date(), updatedAt: new Date()},
      {firstName:'Yulius', lastName:'Prawiranegara', email:'yuliusprawinegara@sekolah.id', SubjectId: 1, createdAt: new Date(), updatedAt: new Date()}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Teacher', null, {});
  }
};
