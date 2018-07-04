'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail :true,
        isUnique(values, next){
          let id  = this.dataValues.id
          if(!id){
            Teacher
            .findOne({
              where :{
                email:values 
              }
            })
            .then(function(teacher){
              if(teacher){
                next('email is used')
              }
            })
            .catch(function(err){
              console.log(err)
            })
          }else{
            Teacher
            .findOne({
              where:{
                email:values
              }
            })
            .then((teacher)=>{
              let id = this.dataValues.id
              console.log("id dari this", id)
              console.log("id dari teacher", teacher.id)

              if(teacher.id == id){
                next()
              }else{
                next('email is used')
              }
            })
            .catch(function(err){
              console.log(err)
            })
            
          }
          
        }
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

  // Teacher.beforeValidate(function(teacher, options){
  //   let id = teacher.id
  //   let email = teacher.email
  //     Teacher
  //     .findById(id)
  //     .then(function(teacher){
  //       if(teacher.email === email){
  //          Teacher.deleteOldEmail(id, email) 
  //       }
  //     })
  //     .catch(function(err){
  //       console.log(err)
  //     })
  // });

  // Teacher.beforeCreate( function(user, options){
  //   console.log('hoiii')
  // });

  // Teacher.deleteOldEmail = function(id, email){
  //   Teacher
  //   .update({
  //     email : null
  //   }, {
  //     where:{
  //       id:id
  //     }
  //   })
  //   .catch(function(err){
  //     console.log(err)
  //   })
  // }

  // Teacher.prototype.deleteEmail = function(values){
  //   Teacher
  //   .findOne
  // }
  
  return Teacher;
};