'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Teachers',
      [
        {
          firstName: "Bambang",
          lastName: "Suprapto",
          email: "bambangsuprapto@sekolah.id",
          createdAt: new Date(),
          updatedAt: new Date(),
          SubjectId: 2,
        }, {
          firstName: "Rukmana",
          lastName: "Fatmawati",
          email: "rukmanafatmawati@sekolah.id",
          createdAt: new Date(),
          updatedAt: new Date(),
          SubjectId: 1,
        }, {
          firstName: "Butet",
          lastName: "Naiborhu",
          email: "butetnaiborhu@sekolah.id",
          createdAt: new Date(),
          updatedAt: new Date(),
          SubjectId: 2,
        }, {
          firstName: "Yulius",
          lastName: "Prawiranegara",
          email: "yuliusprawiranegara@sekolah.id",
          createdAt: new Date(),
          updatedAt: new Date(),
          SubjectId: 2,
        }
      ], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Teachers', null, {});
  }
}
