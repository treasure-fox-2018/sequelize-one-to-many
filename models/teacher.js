'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : "invalid format email"
        },
        isUnique(data,cb){
          Teacher.findAll({where : {email : data}})
          .then(function(check){
            if(check.length > 0){
              cb("email already taken")
            }else{
              cb()
            }
          })
        }
      }
    },
    subject_id: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject,{foreignKey :"subject_id",targetKey :"id"})
  };
  return Teacher;
};