const express = require ('express')
const router = express.Router ()
const ejs = require ('ejs')
const models = require('../models')
const sequelize = require('sequelize')

router.get('/', function (req, res) {
    models.Teacher.findAll(
    {
        order: [['id', 'ASC']],
        include : [{
            model : models.Subject
        }]
    })
    .then(teacher => {
        //res.json({teacher})
        res.render('teacher.ejs', {teacher : teacher})
    })
    .catch(err => {
        res.json({err})
    })
})

router.get('/add', function (req, res) {
    res.render('addTeacher.ejs', {})
})

router.post('/add', function (req, res) {
    models.Teacher.create(req.body)
    .then(() => {
        res.redirect('/teacher')
    })
    .catch((error) => {
        res.json(error)
    })
})

router.get('/:id/delete', function (req, res) {
    let id = req.params.id
    models.Teacher.destroy({where: {id}})
    .then(() => {
        res.redirect('/teacher')
    })
    .catch((error) => {
        res.json(error)
    })
})


router.get('/:id/edit', function (req, res) {
    let id = req.params.id
    models.Teacher.findOne({where: {id}})
    .then(teacher => {
        res.render('editTeacher.ejs', {teacher})
    })
    .catch(error => {
        res.json(error)
    })
    
})

router.post('/:id/edit', function (req, res) {
    let id = req.params.id
    let edit = {}
    edit.firstName = req.body.firstName,
    edit.lastName = req.body.lastName,
    edit.email = req.body.email,
    edit.SubjectId = req.body.SubjectId
    models.Teacher.update(edit, {where : {id}})
    .then(() => {
        res.redirect('/teacher')
    })
    .catch((error) => {
        res.json(error)
    })
})

module.exports = router
