const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', function(req, res){
    res.send('yeee!')
})

router.get('/subjects', function(req, res){
    model.Subject.findAll({include: ['Teachers']})
    .then(subjects => {
        res.render('subjects', {subjects})
    })
    .catch(err => {
        res.send(err)
    })
})

// TEACHER
router.get('/teachers', function(req, res){
    model.Teacher.findAll({include : ['Subject'], order: [['id', 'ASC']]})
    .then(teachers => {
        res.render('teachers', {teachers})
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/teachers/add', function(req, res){
    model.Subject.findAll()
        .then(subjects => {
            // res.json(subjects)
            res.render('addTeacher', {subjects, err:null})
        })
    // res.render('addTeacher', {err:null})
})

router.post('/teachers/add', function(req, res){
    model.Teacher.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        SubjectId: req.body.SubjectId    
    })
    .then(addTeacher => {
        res.redirect('/teachers')
    })
    .catch(err => {
        res.render('addTeacher', {err:err})
        // res.send(err)
    })
})

router.get('/teachers/edit/:id', function(req, res){
    let id = req.params.id
    model.Teacher.findOne({
        include: ['Subject']},{ where: {id}
    })
    .then(editTeacher => {
        model.Subject.findAll()
        .then(subjects => {
            // res.json(editTeacher)
            res.render('editTeacher', {editTeacher, subjects, err:null})
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/teachers/edit/:id', function(req, res){
    let id = req.params.id
    let email = req.body.email
    model.Teacher.findById(id)
    .then(checkTeacher => {
        if(checkTeacher.email === email){
            model.Teacher.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                SubjectId: req.body.SubjectId,
                }, { where: {
                    id: req.params.id
                } 
            })
            .then(checked => {
                res.redirect('/teachers')
            })
            .catch(err => {
                res.send(err)
            })
        }
        else{
            model.Teacher.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email:req.body.email,
                SubjectId: req.body.SubjectId,
                }, { where: {
                    id: req.params.id
                } 
            })
            .then(editTeacher => {
                res.redirect('/teachers')
            })
            .catch(err => {
                let id = req.params.id
                model.Teacher.findById(id)
                .then(editTeacher => {
                    res.render('editTeacher', {editTeacher, err:err.message})
                })
                .catch(err => {
                    res.send(err)
                })
            })
        }
    })
})

router.get('/teachers/delete/:id', function(req, res){
    let id = req.params.id
    model.Teacher.destroy({
        where: {
            id
        }
    })
    .then(deleteTeacher => {
        res.redirect('/teachers')
    })
    .catch(err => {
        res.send(err)
    })
})




module.exports = router