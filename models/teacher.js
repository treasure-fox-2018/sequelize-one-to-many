'use strict';
module.exports = (sequelize, DataTypes) => {
  let Op = sequelize.Op
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: function(value, next){
          Teacher.find({where: {email: value,
          id: {
            [Op.ne] : this.id
          }
          }})
          .then(email => {
            if(email !== null && this.id !== email.id){
              console.log(this.id)
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