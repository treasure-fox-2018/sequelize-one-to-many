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
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };

  Teacher.prototype.getFullName = function(models){
    return `${this.firstName} ${this.lastName}`
  }
  return Teacher;
};