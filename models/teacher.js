'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
    allowNull: false,
    isUnique: function(value,next) {
      Teacher.findOne({
        where: {email: value, id: { [Op.ne]: his.id}}
      })
      .then(email => {
        if(email !== null){
          return next('Email is already used here')
        } else {
          return next()
        }
      })
      .catch(err => {
        console.log(err)
        return next(err)
      })
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