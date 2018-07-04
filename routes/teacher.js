const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
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

router.get('/add', (req, res) => {
  models.Subject.findAll({
    order : [["id", "ASC"]], 
  })
    .then(subjectsData => {
      // res.send(subjec)
      res.render('./teacher/add.ejs', {error : null, subjects : subjectsData})
    })
    
    .catch (err => {
      res.render('./teacher/add.ejs', {error: err.message})
    })
})

router.post('/add', (req, res) => {
  models.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  })
    .then(() => {
      res.redirect('/')
    })

    .catch(err => {
      res.render('./teacher/add.ejs', {error : err.message})
    })
})

router.get('/edit/:id', (req, res) => {
  // console.log(req.params.id)
  models.Teacher.findById(req.params.id)
    .then (editTeacher => {
      res.render('./teacher/edit.ejs', { dataTeacher : editTeacher})
    })
})

router.post('/edit/:id', (req, res) => {

  models.Teacher.update({
    id : req.params.id,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
  }, {
    where : {
      id : req.params.id,
    }
  })
    .then (() => {
      res.redirect('/')
    })

    .catch(err => {
      res.send(err.message)
    })
})

router.get('/delete/:id', (req, res) => {
  
  models.Teacher.destroy({
    where : {
      id : req.params.id
    }
  })
  .then (() => {
    res.redirect('/')
  })
})


module.exports = router