'use strict';

const Model = require('../models/')

module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: `Email Format is Incorrect`
          },
          isEmailUnique: function (email,next) {
            Teacher.find({ 
              where: {email: email}
            })
            .then((email) => {
              if (email !== null) {
                next (`Email address already in use`)
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