const routes = require('express').Router()
const models = require('../models')
const Subjects = models.Subject

routes.get('/subject', (req, res) => {
  Subjects.findAll({
    include: [models.Teacher]
  })
    .then(dataSubject => {
      res.render('subject', {dataSubject: dataSubject, error: null});
    })
    .catch(err => {
      res.render('subject', {error: err.message});
    })
})

routes.get('/subject/add', (req,res) => {
  res.render('add_subject')
})

routes.post('/subject/add', (req,res) => {
  const request = req.body
  Subjects.create({
    subject_name: request.subject_name
  })
    .then(dataSubject => {
      res.redirect('/subject')
    })
    .catch(err => {
      res.render('add_subject', {error: err.message})
    })
})

routes.get('/subject/edit/:id', (req, res) => {
  Subjects.findById(req.params.id)
    .then(editSubject => {
      res.render('edit_subject', {editSubject: editSubject, error: null})
    })
    .catch(err => {
      res.render('edit_subjet', {error: err.message})
    })
})

routes.post('/subject/edit/:id', (req, res) => {
  const request = req.body
  Subjects.update({
    subject_name: request.subject_name
  }, 
  {
    where: {
      id: req.params.id
    }
  })
    .then(editSubject => {
      res.redirect('/subject')
    })
    .catch(err => {
      res.render('edit_subject', {error: err.message})
    })
})

routes.get('/subject/delete/:id', (req, res) => {
  Subjects.findById(req.params.id)
    .then(deleteSubject => {
      res.render('delete_subject', {deleteSubject: deleteSubject})
    })
})

routes.post('/subject/delete/:id', (req, res) => {
  Subjects.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teacher')
  })
})

module.exports = routes
