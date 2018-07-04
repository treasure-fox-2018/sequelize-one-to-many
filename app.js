'use strict'
const express = require('express')
let app = express()
let models = require('./models')
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view angine', 'ejs')

app.get('/', function(req, res){
    res.render('homepage.ejs')
})

app.get('/teacher', function(req,res){
    models.Teacher.findAll({
        include: [models.Subject]
    })
    .then(teachers => {
        res.render('teachers.ejs', {teachers: teachers})
    })
})

app.get('/subject', function(req,res){
    models.Subject.findAll({
        include: [models.Teacher]
    })
    .then(subjects => {
        //console.log(subjects[0].Teachers.first_name)
        res.render('subject.ejs', {subjects: subjects})
    })
})

app.get('/teacher/add', function(req, res){
    models.Subject.findAll()
    .then(subjects => {
        res.render('new_teacher.ejs', {error: null, subjects: subjects})
    })
    .catch(err => {
        res.send(err.message)
    })
    
})

app.post('/teacher', function(req, res){
    models.Teacher.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        SubjectId: req.body.subjectId
    })
    .then(function(){
        res.redirect('/teacher')
    })
    .catch(function(err){
        models.Subject.findAll()
        .then(subjects => {
            let inputdata = {first_name: req.body.first_name, last_name: req.body.last_name,email: req.body.email}
            res.render('new_teacher.ejs', {inputData: inputdata, error: err.message, subjects: subjects})
        })
        
    })

})

app.get('/teacher/edit/:id', function(req,res){
    models.Teacher.findById(req.params.id)
    .then(teacher=>{
        res.render('teacher_edit.ejs',{teacher:teacher})
    })
})

app.post('/teacher/edit/:id',function(req,res){
    models.Teacher.update({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    },{
        where : {id:req.params.id}
    })
    .then(teacher=>{
        res.redirect('/teacher')        
    })
    .catch(err=>{
        res.send(err.message)
    })
})


app.get('/teacher/delete/:id',function(req,res){
    models.Teacher.destroy({
            where:{id:req.params.id}
        })
        .then(teacher=>{
            res.redirect('/teacher')
        })
        .catch(err=>{
            res.send(err.message);
        })
    })

app.listen(3000)
