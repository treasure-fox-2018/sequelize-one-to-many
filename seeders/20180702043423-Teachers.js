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
      firstName: 'Bambang',
      lastName: 'Suprapto',
      createdAt: new Date(),
      updatedAt: new Date(), 
      email: 'bambangsuprapto@sekolah.id',
      SubjectId: 2
    }, 
    {
      firstName: 'Rukmana',
      lastName: 'Fatmawati',
      createdAt: new Date(),
      updatedAt: new Date(), 
      email: 'rukmanafatmawati@sekolah.id',
      SubjectId: 2
    }, 
    {
      firstName: 'Butet',
      lastName: 'Naiborhu',
      createdAt: new Date(),
      updatedAt: new Date(), 
      email: 'butetnaiborhu@sekolah.id',
      SubjectId: 1
    }, 
    {
      firstName: 'Yulius',
      lastName: 'Prawiranegara',
      createdAt: new Date(),
      updatedAt: new Date(), 
      email: 'yuliusprawiranegara@sekolah.id',
      SubjectId: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
