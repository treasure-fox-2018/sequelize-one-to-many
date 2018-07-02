const routes = require('express').Router();
const models = require('../models');

routes.get('/student', (req, res) =>{
  models.Student.findAll()
  .then(function(students){
    res.render("student",{title:'Students Data', links:'links:', students: students})
  })
})

routes.get('/add', (req, res) =>{
  res.render("student-add",{title:'Student Form', links:'links:',errMessage: null})
})

routes.post('/add', (req, res) =>{
  // console.log(req.body);
  models.Student.create({first_name: req.body.firstname, last_name: req.body.lastname, email: req.body.email})
  .then(function(student){
    res.redirect('/student')
  })
  .catch(function(err){
    // console.log(req.body);
    let student = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email}
    res.render("student-add",{title:'Student Form', links:'links:', errMessage: err.message, student: student})
  })
})

routes.get('/edit/:id', (req, res) =>{
  models.Student.findById(req.params.id)
  .then(function(student){
    // console.log(student);
    res.render("student-edit",{title:'Student Form', links:'links:', student: student})
  })
})

routes.post('/edit/:id', (req, res) =>{
  models.Student.update({first_name: req.body.firstname, last_name: req.body.lastname, email: req.body.email},
    {where: {id: req.params.id}})
  .then(function(student){
    res.redirect('/')
  })
})

routes.get('/delete/:id', (req, res) =>{
  models.Student.destroy({where:{id: req.params.id}})
  .then(function(student){
    res.redirect('/')
  })
})

module.exports = routes
