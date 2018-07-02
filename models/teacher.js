'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isUnique: true ,
      allowNull: false,
      validate: {
        isMail(value) {
          if(/\S+@\S+\.\S+/.test(value) != true) {
            throw new Error('Must input valid email format!')
          }
        }
      }
    }
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
  };
  return Teacher;
};