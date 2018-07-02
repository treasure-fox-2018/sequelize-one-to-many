'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // Subject.hasMany(models.Teacher, {foreignKey : id, targetKey : subjectId})
    Subject.hasMany(models.Teacher)
  };
  return Subject;
};