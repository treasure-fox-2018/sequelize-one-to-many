const express = require ('express')
const router = express.Router ()
const models = require('../models')

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
    models.Subject.findAll()
    .then(subject => {
        res.render('addTeacher.ejs', {subject : subject})
    })
    .catch(() => {
        res.json(error)
    })
})

router.post('/add', function (req, res) {
    let add = {}
    add.firstName = req.body.firstName
    add.lastName = req.body.lastName
    add.email = req.body.email
    add.SubjectId = req.body.SubjectId
    models.Teacher.create(add)
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
        models.Subject.findAll()
        .then(subject => {
            res.render('editTeacher.ejs', {teacher : teacher, 
                                        subject : subject})
        })
        .catch(error => {
            res.json(error)
        })
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
