'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          args: true,
          msg : "Email format is incorrect"
        },
        isUnique (value, next){
          Teacher.findAll({
            where: {
              email: value
            }
          })
          .then(emailTeacher => {
            if(emailTeacher.length == 0){
              next()
            } else{
              next('Email already exist!')
            }
          })
          .catch(err => {
            res.send(err.message)
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};