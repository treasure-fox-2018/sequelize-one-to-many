const subject = require('express').Router();
const models = require('../models');

subject.get('/subject', (req, res) => {
  models.Subject.findAll({
    order : [["id", "ASC"]], 
    include : [models.Teacher]
  })
    .then(subjectData => {
      console.log(subjectData)
      res.render('./subject/home.ejs', { SubjectData : subjectData});
    })

    .catch(err => {
      res.send(err.message)
    })
})

subject.get('/subject/add', (req, res) => {
  res.render('./subject/add.ejs', {error : null})
  
  
})

subject.post('/subject/add', (req, res) => {
  models.Subject.create({
    subject_name: req.body.subject_name,
  })
    .then(() => {
      res.redirect('/subject')
    })

    .catch(err => {
      res.render('./subject/add.ejs', {error : err.message})
    })
})

subject.get('/subject/edit/:id', (req, res) => {
  console.log(req.params.id)
  models.Subject.findById(req.params.id)
    .then (editSubject => {
      res.render('./subject/edit.ejs', { dataSubject : editSubject})
    })
})

subject.post('/subject/edit/:id', (req, res) => {

  models.Subject.update({
    subject_name : req.body.subject_name,
  }, {
    where : {
      id : req.params.id,
    }
  })
    .then (() => {
      res.redirect('/subject')
    })

    .catch(err => {
      res.send(err.message)
    })
})

subject.get('/subject/delete/:id', (req, res) => {
  
  models.Subject.destroy({
    where : {
      id : req.params.id
    }
  })
  .then (() => {
    res.redirect('/subject')
  })
})
module.exports = subject