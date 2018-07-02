'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail: true,
        isUnique(value, next) {
          Teacher.find({
            where: { email : value }
          }).then((user) => {
            if (user) {
              next('email must be unique')
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
    
    Teacher.belongsTo(models.Subject, {foreignKey: 'SubjectId', targetKey: 'id'});  };

  return Teacher;
};