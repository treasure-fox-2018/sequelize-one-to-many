const express = require ('express')
let router = express.Router ()
const models = require('../models')

router.get('/', function (req,res) {
    models.Subject.findAll(
        {
            order: [['id', 'ASC']],
            include : [{
                model : models.Teacher
            }]
        })
        .then(subject => {
            //res.json({subject})
            res.render('subject.ejs', {subject : subject})
        })
        .catch(err => {
            res.json({err})
        })
})

router.get('/add', function (req, res) {
    res.render('addSubject.ejs', {})
})

router.post('/add', function (req, res) {
    let add = {}
    add.subjectName = req.body.subjectName
    models.Subject.create(add)
    .then(() => {
        res.redirect('/subject')
    })
    .catch((error) => {
        res.json(error)
    })
})

router.get('/:id/delete', function (req, res) {
    let id = req.params.id
    models.Subject.destroy({where: {id}})
    .then(() => {
        res.redirect('/subject')
    })
    .catch((error) => {
        res.json(error)
    })
})

router.get('/:id/edit', function (req, res) {
    let id = req.params.id
    models.Subject.findOne({where: {id}})
    .then(subject => {
        res.render('editSubject.ejs', {subject})
    })
    .catch(error => {
        res.json(error)
    })
})

router.post('/:id/edit', function (req, res) {
    let id = req.params.id
    let edit = {}
    edit.subjectName = req.body.subjectName
    models.Subject.update(edit, {where : {id}})
    .then(() => {
        res.redirect('/subject')
    })
    .catch((error) => {
        res.json(error)
    })
})

module.exports = router