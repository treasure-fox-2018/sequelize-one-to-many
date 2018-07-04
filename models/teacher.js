'use strict';

module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  var Teacher = sequelize.define('Teacher', {
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
          Teacher.find({
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
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};