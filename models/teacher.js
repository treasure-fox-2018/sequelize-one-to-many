'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        isUnique: function(inputEmail, next) {
          Teacher.find({
            where: {
              id: {
                [Op.ne]: this.id
              },
              email:inputEmail,
            }
          })
          .then(function(emailValidation){
            if(emailValidation !== null) {
              next("this email was exist !")
            } else {
              next()
            }
          })
        }
      },
    },
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