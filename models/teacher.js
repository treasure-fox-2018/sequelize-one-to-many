'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmailUnique(value,cb){
          Teacher.findAll({
            where: {email:value}
          })
          .then(teacher=>{
            if(teacher.length>0){
              cb("email already used")
            }
            else{
              cb()
            }
          })
          .catch(err=>{
            console.log(err);
          })
        },isEmail:{
          args:true,
          msg: "email format is incorrect"
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

