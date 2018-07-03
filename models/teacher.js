'use strict';
module.exports = (sequelize, DataTypes) => {
  let Op = sequelize.Op
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        is: { args: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, msg: 'Email format is incorrect'},
        isUnique: function(value, next) {
          Teacher.findOne({
            where: {email : value,
            id: {
              [Op.ne] : this.id
            }}
          })
          .then(result => {
            if(result !== null) {
              return next("email already in use!")
            }
            else {
              return next();
            }
          })

          .catch(failed => {
            return next(`Error Message : ${failed}`)
          })
        }
      },
    }  
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};