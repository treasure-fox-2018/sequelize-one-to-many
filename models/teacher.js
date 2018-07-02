'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    // {
    //   type: DataTypes.STRING,
    //   validate: {
    //     // isEmail: {
    //     //   args: true,
    //     //   msg: 'email format is incorrect'
    //     // },
    //     // isUnique: function(email, callback) {
    //     //   Teacher.findOne({where:{email:email}})
    //     //   .then(function(available) {
    //     //     if(available) {
    //     //       console.log('email already exist!');
    //     //     } else {
    //     //       console.log('yes'); // not available
    //     //     }
    //     //   })
    //     // }
    //   }
    // },
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};