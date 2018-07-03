const express = require('express')
const router = express.Router ()
const models = require('../models')

router.get('/', function(req, res) {
    models.Student.findAll({
        order: [['id','ASC']]
    })
    .then(student => {
        res.render('student.ejs', {student : student})
        //res.json({student})
    })
    .catch(error => {
        res.json({error})
    })
})

router.get('/add', function (req, res) {
    res.render('addStudent.ejs')
})

router.post('/add', function (req, res) {
    let add = {}
    add.firstName = req.body.firstName
    add.lastName = req.body.lastName
    add.email = req.body.email
    models.Student.create(add)
    .then(() => {
        res.redirect('/student')
    })
    .catch(error => {
        res.json({error})
    })
})

router.get('/:id/delete', function (req, res) {
    let id = req.params.id
    models.Student.destroy({where: {id}})
    .then(() => {
        res.redirect('/student')
    })
    .catch(error => {
        res.json({error})
    })
})

router.get('/:id/edit', function (req, res) {
    let id = req.params.id
    models.Student.findOne({where : {id}})
    .then(student => {
        res.render('editStudent.ejs', {student})
    })
    .catch(error => {
        res.json({error})
    })
})

router.post('/:id/edit', function (req,res) {
    let id = req.params.id
    let edit = {}
    edit.firstName = req.body.firstName
    edit.lastName = req.body.lastName
    edit.email = req.body.email
    models.Student.update(edit, {where : {id}})
    .then(() => {
        res.redirect('/student')
    })
    .catch(error => {
        res.json({error})
    })
})

router.get('/:id/addSubject', function(req, res) {
    let id = req.params.id
    models.Student.findOne({where: {id},
        include : [{model : models.Subject}]})
    .then(student => {
        models.Subject.findAll()
        .then(subject => {
            //res.json({student : student})
            res.render('addSubjectStudent', {student : student,
                                            subject : subject}) 
        })
        .catch(error => {
            res.json({error})
        })
    })
    .catch(error => {
        res.json({error})
    })
})

router.post('/:id/addSubject', function(req, res) {
    let id = req.params.id
    let edit = {}
    edit.SubjectId = req.body.SubjectId
    edit.StudentId = id
    models.SubjectStudent.create(edit)
    .then(() => {
        res.redirect(`/student/${id}/addSubject`)
    })
    .catch(error => {
        res.json({error})
    })
})

module.exports = router