'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Your Email is Wrong',
        },
        isUnik: function(value,next){
          Teacher.findOne({
            where: {
              email: value,
              id: {[Op.ne]: this.id}
            }
          }).then((data_teacher) => {
            if (data_teacher == null) {
              next()
            }else {
              return next('email is duplicated')
            }
          }).catch((err) => {
            return next(err)
          })
  }
      }
    },
    SubjectId: DataTypes.INTEGER,
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};