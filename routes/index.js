const express = require('express')
const routes = express.Router()
const model = require('../models')

routes.get('/teachers', function(req, res) {
  model.Teacher
    .findAll({
      include: [{
        model: model.Subject
      }],
      order: [
        ['id', 'asc']
      ]
    })
    .then(function(teachers) {
      res.render('teachers', {
        teachers: teachers
      })
    })
    .catch(function(err) {
      res.json(err)
    })
})
routes.get('/teachers/edit/:id', function(req, res) {
  model.Teacher
    .findById(req.params.id)
    .then(function(teacher) {
      return teacher
    })
    .then(function(teacher) {
      model.Subject
        .findAll()
        .then(function(subjects) {
          res.render('editTeacher', {
            teacher: teacher,
            subjects: subjects,
            error: null
          })
        })
        .catch(function(err) {
          res.json(err)
        })
    })
    .catch(function(err) {
      res.json(err)
    })
})
routes.post('/teachers/edit/:id', function(req, res) {
  model.Teacher
    .update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      SubjectId: req.body.SubjectId,
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(function(teacher) {
      res.redirect('/teachers')
    })
    .catch(function(error) {
      model.Teacher
        .findById(req.params.id)
        .then(function(teacher) {
          res.render('editTeacher', {
            teacher: teacher,
            error: error.message
          })
        })
        .catch(function(err) {
          res.send(err)
        })
    })

})
routes.get('/subjects', function(req, res) {
  model.Subject
    .findAll({
      include: [{
        model: model.Teacher
      }]
    })
    .then(function(subjects) {
      res.render('subjects', {
        subjects: subjects
      })
    })
    .catch(function(err) {
      res.json(err)
    })
})
routes.get('/teachers/delete/:id', function(req, res) {
  model.Teacher
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(teacher) {
      res.redirect('/teachers')
    })
    .then(function(err) {
      res.json(err)
    })
})

module.exports = routes
