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
    res.render('add_teacher')
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
})

router.get('/teacher/edit/:id',function(req,res){
    model.Teacher.findById(req.params.id)
    .then((data_teacher) => {
        res.render('edit_teacher', {dataTeacher: data_teacher})
    })
})

router.post('/teacher/edit/:id', function(req,res){
    model.Teacher.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        SubjectId: req.body.SubjectId,
    },{where: {id: req.params.id}})
    .then(() => {
        // console.log(data_teacher)
        res.redirect('/teacher')
    })
})

router.get('/teacher/delete/:id',function(req,res){
    model.Teacher.destroy({where: {id:req.params.id}})
    .then(()=> {
        res.redirect('/teacher')
    })
})

module.exports = router
