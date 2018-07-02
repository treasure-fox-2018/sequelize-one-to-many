'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is not valid!'
        },
        isUnique(value, next) {
          Student.findOne({
            where: { email: value }
          }).then(data => {
            if (data) {
              next('Email already exists')
            } else {
              next()
            }
          }).catch(err => console.log(err))
        }
      }
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};