'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject',
  {
    subjectName: DataTypes.STRING
  },
  {})

  Subject.associate = function(models) {
      Subject.hasMany(models.teacher)
  }

  return Subject
}
