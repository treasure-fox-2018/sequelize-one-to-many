'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: function(value, next){
          Teacher.find({where: {email: value}})
          .then(email => {
            if(email !== null){
              return next('Email is already used here')
            } else {
              next()
            }
          })
        },
        isEmail: { args: true, msg: "Your email is Wrong"}},
    },
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
