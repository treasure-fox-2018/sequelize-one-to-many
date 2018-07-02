'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher',
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  },
  {})

  Teacher.associate = function(models) {
      Teacher.belongsTo(models.Subject)
  }

  return Teacher
}
