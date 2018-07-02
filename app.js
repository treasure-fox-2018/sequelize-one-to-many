const express = require('express')
const app = express()
const models = require('./models')
const Mteacher = models.Teacher
const Msubject = models.Subject
const bodyParser = require('body-parser')
app.set('view engine','ejs')
// var urlencodedParser = require('urlencoded-parser')

// console.log(models.teacher)

app.use(bodyParser.urlencoded())
app.get('/',(req,res) => {
    res.render('homepage')
})

app.get('/teacher',function(req,res){
    Mteacher.findAll({include : models.Subject})
    .then(function(teacher){
        res.render('teacher',{dataTeacher:teacher})
        // res.send(teacher)
    })
})

app.get('/subject',function(req,res){
    Msubject.findAll({include : models.Teacher})
    .then(function(subject){
            res.render('subject',{dataSubject:subject})
            // res.send(subj)
        // res.send(subject)
        
    })
})

app.get('/teacher/add',function(req,res){
    Msubject.findAll()
    .then(subject =>{
        res.render('formRegisTeacher',{dataSubject:subject})
    })
})

app.post('/teacher',function(req,res){
    Mteacher.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        SubjectId : req.body.subjectId
    })
    .then(function(){
        res.redirect('/teacher')
        // res.send('aaaa')
    })
    .catch(function(err){
        res.send(err.message)
    })
})

app.get('/teacher/edit/:id',function(req,res){
    Mteacher.findById(req.params.id)
    .then(function(teacher){
        Msubject.findAll()
        .then(subject => {
            // res.send(subject)
            res.render('editTeacher',{dataTeacher:teacher,dataSubject:subject})
        })
    })
    // res.render('editTeacher')
})

app.post('/teacher/edit/:id',(req,res) => {
    Mteacher.update({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        SubjectId : req.body.subjectId

    }, {where:{id:req.params.id}})
    .then(teacher => {
        res.redirect('/teacher')
    })
})

app.get('/teacher/delete/:id',(req,res) => {
    Mteacher.destroy({where : {id : req.params.id}})
    .then(teacher => {
        res.redirect('/teacher')
    })
})


app.listen(3000, ()=> {
    console.log('jalan');
    
})