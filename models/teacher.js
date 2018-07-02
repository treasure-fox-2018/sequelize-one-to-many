'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:
    {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args:true,
          msg:"email format is incorrect"
        },
        isUnique(value,cb){
          Teacher.findOne({
            where:{
              email:value
            }
          })
          .then(function(emailTeacher){
            if(emailTeacher !== null){
              cb("use another email")
            }else{
              cb()  
            }
          })
          .catch(function(err){
            cb("error")
          })
        }
      }
    }
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };

  //instance method
  Teacher.prototype.getFullName = function(){
    let firstName = this.first_name;
    let lastName = this.last_name;
    return `${firstName} ${lastName}`
  }
  return Teacher;
};