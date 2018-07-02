'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function (models) {
    // associations can be defined here

    Subject.hasMany(models.Teacher) //that's why we can call models.Menu

  };
  return Subject;
};