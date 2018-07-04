'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail :true,
        isUnique(value, next){
          Teacher
          .findOne({
            where:{email:value}
          })
          .then(function(teacher){
            if(teacher){
              next("please use another email")
            }else{
              next()
            }
          })
          .catch(function(err){
            next(err.message)
          })
        },
      },
    },
  }, { });
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };

  Teacher.prototype.getFullName = function(models){
    return `${this.firstName} ${this.lastName}`
  }

  Teacher.beforeValidate(function(teacher, options){
    let id = teacher.id
    let email = teacher.email
      Teacher
      .findById(id)
      .then(function(teacher){
        if(teacher.email === email){
           Teacher.deleteOldEmail(id, email) 
        }
      })
      .catch(function(err){
        console.log(err)
      })
  });

  Teacher.beforeCreate( function(user, options){
    console.log('hoiii')
  });

  Teacher.deleteOldEmail = function(id, email){
    Teacher
    .update({
      email : null
    }, {
      where:{
        id:id
      }
    })
    .catch(function(err){
      console.log(err)
    })
  }
  
  return Teacher;
};