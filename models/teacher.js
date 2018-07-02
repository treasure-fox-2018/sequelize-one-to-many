'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail:true,
        isUnique: function (value, next) {
          var self = this;
          Teacher.find({ where: { email: value } })
            .then(function (user) {
              // reject if a different user wants to use the same email
              if (user && self.id !== user.id) {
                return next('Email already in use! or email format is wrong');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            });
        }

      },
    },
    SubjectId: DataTypes.INTEGER


  }, {});
  Teacher.associate = function (models) {
    // associations can be defined here

    Teacher.belongsTo(models.Subject)

  };
  return Teacher;
};