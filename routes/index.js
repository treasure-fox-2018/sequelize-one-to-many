const routes = require('express').Router();
const models = require('../models');

routes.get('/',function(req,res){
    // res.send('connect')
    res.render('index.ejs')
})

routes.get('/teachers',function(req,res){
    models.Teacher.findAll({
        attributes:['id','first_name','last_name','email'],
        include:[{model: models.Subject}]
    })
    .then(function(teachers){
        res.render('teacher.ejs',{dataTeacher: teachers})
        // res.send(teachers)
    })
})

routes.get('/teachers/add',function(req,res){
    models.Subject.findAll({
        attributes:['id','subjectName']
    }).then(function(subjects){
        res.render('teacherAdd.ejs',{
            dataSubject: subjects
        })
    })
})

routes.post('/teachers/add',function(req,res){
    models.Teacher
    .create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        SubjectId: req.body.subjectId
    })
    .then(function(){
        res.redirect('/teachers')
    }).catch(function(err){

    })
})

routes.get('/teachers/edit/:id',function(req,res){
    models.Teacher
    .findById(req.params.id)
    .then(function(teachers){
        models.Subject.findAll({
            attributes:['id','subjectName']
        }).then(function(subjects){
            res.render('teacherEdit.ejs',{
                dataTeacher: teachers,
                dataSubject: subjects
            })
            // res.send(teachers)
        })
    })
})

routes.post('/teachers/edit/:id',function(req,res){
    models.Teacher
    .update({
        first_name:req.body.firstname,
        last_name:req.body.lastname,
        email: req.body.email,
        SubjectId: req.body.subjectId
    },{
        where:{id:req.params.id}
    })
    .then(function(){
        res.redirect('/teachers')
    })
})

routes.get('/teachers/delete/:id',function(req,res){
    models.Teacher
    .destroy({
        where:{
            id:req.params.id
        }
    })
    .then(function(){
        res.redirect('/teachers')
    })
})

routes.get('/subjects',function(req,res){
    models.Subject.findAll({
        attributes:['id','subjectName'],
        include:[{model: models.Teacher}]
    })
    .then(function(subjects){
        // res.send(subjects)
        res.render('subject.ejs',{dataSubject: subjects})
    })
})

module.exports = routes