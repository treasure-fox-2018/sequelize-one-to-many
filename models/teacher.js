'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher',
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {})

  //  Validation using hooks
  // Teacher.beforeCreate((teacher, options) => {
  //     return Teacher.findAll({
  //         where: {
  //           email: teacher.email}
  //     })
  //     .then(emailExists => {
  //         if (emailExists) {
  //             throw new Error('EMAIL EXISTS!')
  //         }
  //     })
  //     .catch(err => console.log(err))
  // })

  Teacher.associate = function(models) {
      Teacher.belongsTo(models.Subject)
  }

  return Teacher
}
