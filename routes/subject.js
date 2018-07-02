const routes = require('express').Router();
const models = require('../models');

routes.get('/subject', (req, res) =>{
  models.Subject.findAll()
  .then(function(subjects){
    res.render("subject",{title:'Subjects Data', links:'links:', subjects: subjects})
  })
})

routes.get('/subject/add', (req, res) =>{
  res.render("subject-add",{title:'Subject Form', links:'links:'})
})

routes.post('/subject', (req, res) =>{
  // console.log(req.body);
  models.Subject.create({name: req.body.subjectname})
  .then(function(subject){
    res.redirect('/')
  })
})

routes.get('/subject/edit/:id', (req, res) =>{
  models.Subject.findById(req.params.id)
  .then(function(subject){
    // console.log(subject);
    res.render("subject-edit",{title:'Subject Form', links:'links:', subject: subject})
  })
})

routes.post('/subject/edit/:id', (req, res) =>{
  models.Subject.update({name: req.body.subjectname},
    {where: {id: req.params.id}})
  .then(function(subject){
    res.redirect('/')
  })
})

routes.get('/subject/delete/:id', (req, res) =>{
  models.Subject.destroy({where:{id: req.params.id}})
  .then(function(subject){
    res.redirect('/')
  })
})

module.exports = routes
