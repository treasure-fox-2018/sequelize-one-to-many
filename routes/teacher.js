const teacher = require('express').Router();
const models = require('../models');

teacher.get('/teacher', (req, res) => {
  models.Teacher.findAll({
    order : [["id", "ASC"]], 
    include : [models.Subject]
  })
    .then(teachersData => {
      // console.log(teachersData)
      res.render('./teacher/home.ejs', { teachersData : teachersData});
    })

    .catch(err => {
      res.send(err.message)
    })
})

teacher.get('/teacher/add', (req, res) => {
  res.render('./teacher/add.ejs', {error : null})
  
  
})

teacher.post('/teacher/add', (req, res) => {
  models.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  })
    .then(() => {
      res.redirect('/teacher')
    })

    .catch(err => {
      res.render('./teacher/add.ejs', {error : err.message})
    })
})

teacher.get('/teacher/edit/:id', (req, res) => {
  console.log(req.params.id)
  models.Teacher.findById(req.params.id)
    .then (editTeacher => {
      res.render('./teacher/edit.ejs', { dataTeacher : editTeacher})
    })
})

teacher.post('/teacher/edit/:id', (req, res) => {

  models.Teacher.update({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
  }, {
    where : {
      id : req.params.id,
    }
  })
    .then (() => {
      res.redirect('/teacher')
    })

    .catch(err => {
      res.send(err.message)
    })
})

teacher.get('/teacher/delete/:id', (req, res) => {
  
  models.Teacher.destroy({
    where : {
      id : req.params.id
    }
  })
  .then (() => {
    res.redirect('/teacher')
  })
})


module.exports = teacher