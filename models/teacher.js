'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        isEmailUnique: 
          function(emailInput, next) {
            Teacher.find({
              where: {
                email: emailInput,
                id: {
                  [Op.ne]: this.id
                }
              }
            })
            .then(validasiEmail => {
              if (validasiEmail != null) {
                next("Email sudah ada yang menggunakan. Silahkan gunakan email yang lain")
              } else {
                next()
              }
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