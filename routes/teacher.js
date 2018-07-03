const routes = require('express').Router()
const models = require('../models')
const Teachers = models.Teacher

routes.get('/teacher', (req,res) => {
  Teachers.findAll({
    include: [models.Subject],
    order: [['id', 'ASC']]
  })
    .then(dataTeacher => {
      res.render('teacher', {dataTeacher: dataTeacher, error: null})
    })
    .catch(err => {
      res.render('teacher', {error: err.message})
    })
});

routes.get('/teacher/add', (req, res) => {
  res.render('add_teacher', {error: null})
})

routes.post('/teacher/add', (req, res) => {
  const request = req.body
  Teachers.create({
    first_name: request.first_name ,
    last_name: request.last_name,
    email: request.email,
    SubjectId: request.SubjectId,    
  })
  .then(() => {
    res.redirect('/teacher')
  })
  .catch(err => {
    res.render('add_teacher', {error: err.message})
  })
})


routes.get('/teacher/edit/:id', (req, res) => {
  Teachers.findById(req.params.id)
    .then(editTeacher => {
      res.render('edit_teacher', {editTeacher: editTeacher, error: null})
    })
    .catch(err => {
      res.render('edit_teacher', {error: err.message})
    })
})

routes.post('/teacher/edit/:id', (req, res) => {
  const request = req.body
  Teachers.update({
    id: req.params.id,
    first_name: request.first_name,
    last_name: request.last_name,
    email: request.email,
    SubjectId: request.SubjectId
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/teacher')
    })
    .catch(err => {
      res.render('edit_teacher', {error: err.message})
      console.log(err);
      
    })
})

routes.get('/teacher/delete/:id', (req, res) => {
  Teachers.findById(req.params.id)
    .then(deleteTeacher => {
      res.render('delete_teacher', {deleteTeacher})
    })
})

routes.post('/teacher/delete/:id', (req, res) => {
  Teachers.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teacher')
  })
})

module.exports = routes
