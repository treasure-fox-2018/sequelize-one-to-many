const express = require('express')
const router  = express.Router()
const model = require('../models')

router.get('/teacher', function(req,res){
    model.Teacher.findAll({
        order: [["id","ASC"]],
        include: [model.Subject]
    })
    .then((data_teacher) => {
        res.render('teacher',{dataTeacher: data_teacher})
    })
})

router.get('/teacher/add',function(req,res){
    model.Subject.findAll()
    .then((dataTeacher) => {
        res.render('add_teacher', {err: null, dataTeacher: dataTeacher})
    })
})

router.post('/teacher/add', function(req,res){
    model.Teacher.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        SubjectId: req.body.SubjectId,
    })
    .then(() => {
        res.redirect('/teacher')

    })
    .catch((err) => {
        console.log(err)
        res.render('add_teacher',{err: err.message, dataSubject: null })
    })
})

router.get('/teacher/edit/:id',function(req,res){
    model.Teacher.findById(req.params.id)
    .then((dataTeacher) => {
        res.render('edit_teacher', {err: null, dataTeacher: dataTeacher})
    })
})

router.post('/teacher/edit/:id', function(req,res){
    model.Teacher.update({
        id: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        SubjectId: req.body.SubjectId,
    },{where: {id: req.params.id}})
    .then(() => {
        // console.log(data_teacher)
        res.redirect('/teacher')
    })
    .catch((err) => {
        console.log(err)
        res.render('edit_teacher',{err: err.message, dataTeacher: null })
    })
})

router.get('/teacher/delete/:id',function(req,res){
    model.Teacher.destroy({where: {id:req.params.id}})
    .then(()=> {
        res.redirect('/teacher')
    })
})

module.exports = router
