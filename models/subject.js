'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {

    Subject.hasMany(models.Teacher, {foreignKey: 'SubjectId', sourceKey: 'id'})

    Subject.belongsToMany(models.Student, {through: 'SubjectStudent'})
  
  };
  return Subject;
};