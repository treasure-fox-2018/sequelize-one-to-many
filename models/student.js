'use strict';

module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Wrong email format!'
        },
        isUnique: function (value, cb) {
          console.log(this)
          Student.find({
            where: {
              email: value,
              id: {
                [Op.ne]: this.id
              }
            }
          })
          .then( (email) => {
            if (email !== null) {
              cb ('Email already used!');
            } else {
              cb(null);
            }
          });
        }
      }
    },
  }, {});

  Student.associate = function(models) {
  };
  return Student;
};