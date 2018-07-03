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
  return queryInterface.bulkInsert('Subjects', [
    {
      subjectName: 'DragonTrainer-102'
    }, {
      subjectName: 'DemonSlaying-201'
    }, {
      subjectName: 'SpellSlinging-301'
    }, {
      subjectName: 'PoisonAndAssasination'   
    }, {
      subjectName: 'BeastHunting-TargetVitalSpot'
    }], 
    {});
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
