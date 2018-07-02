'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: function(value, next){
          Teacher.find({where: {email: value}})
          .then(email => {
            if(email !== null){
              return next('email is already used here')
            } else {
              next()
            }
          })
        },
        isEmail: {
          args: true,
          msg: 'email is not valid'
        }}
}
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};