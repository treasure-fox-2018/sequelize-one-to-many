'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type:DataTypes.STRING,
      validate:{isEmail:true,
      unique: function(value,next) {
        Student.find({
          where: {email: value}
        })
        .then(email=>{
          if (email !== null) {
            return next('email is already used')
          }else {
            next()
          }
        })
        .catch(err=>{
          return next('error')
        })
      }},
    },
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};
