'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "email format is incorrect"
        },

        isUnik(isi, cb) {
          Teacher.findAll({
              where: {
                email: isi
              }

            })
            .then(function (data) {
              console.log(data)
              if (data.length < 1) {
                cb()


              } else {
                cb('email sudah ada')
              }



            })

        }
      }




    }
  }, {});
  Teacher.associate = function (models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
