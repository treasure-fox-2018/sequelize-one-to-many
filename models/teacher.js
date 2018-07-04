'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        // masukin regex is:
        isUnique: function(value, next){
          Teacher.findOne({where: {email: value, id: { [Op.ne]: this.id}
          }
        })
          .then(email => {
            if(email !== null){
              return next('Email is already used here')
            } else {
              return next()
            }
          })
          .catch(err =>{
            console.log(err)
            return next(err)
          })
        },
    },
    SubjectId: DataTypes.INTEGER
  }
});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
