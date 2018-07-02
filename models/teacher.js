'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is not valid!'
        },
        isUnique(value, next) {
          Teacher.findOne({
            where: { email: value }
          }).then(data => {
            if (data) {
              next('Email already exists')
            } else {
              next()
            }
          }).catch(err => console.log(err))
        }
      }
    },
    subject_id: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject, {
      foreignKey: 'subject_id',
      targetKey: 'id'
    })
  };
  return Teacher;
};

//  Student.belongsToMany(models.Subject, {
//    through: 'StudentSubject'
//  })

// Subject.belongsToMany(models.Student, {
//   through: 'StudentSubject'
// })

// on conjunction table
// --- Use this if you wanted to query data from conjunction table
// StudentSubject.belongsTo(Student)
// StudentSubject.belongsTo(Subject)