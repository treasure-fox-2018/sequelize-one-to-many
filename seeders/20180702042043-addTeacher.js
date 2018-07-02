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
      return queryInterface.bulkInsert("Teachers",[{
        firstName: "Bambang",
        lastName : "Supratpto",
        email : "bambangsuprapto@sekolah.id",
        createdAt : new Date(),
        updatedAt : new Date(),
      },{
        firstName: "Rukamana",
        lastName : "Fatmawati",
        email : "RukamanaFatmawati@sekolah.id",
        createdAt : new Date(),
        updatedAt : new Date(),
      },{
        firstName: "Butet",
        lastName : "Nairbohu",
        email : "ButetNairbohu@sekolah.id",
        createdAt : new Date(),
        updatedAt : new Date(),
      },{
        firstName: "Yulius",
        lastName : "Prawiranegara",
        email : "yuliusprawiranegara@sekolah.id",
        createdAt : new Date(),
        updatedAt : new Date(),
      },])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Teacher", null, {})
  }
};
