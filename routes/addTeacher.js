const express = require('express');
const routes = express.Router();
const model = require('../models')


routes.get('/teacher',(req,res) => {
    res.render('teacher.ejs')
})

routes.get('/teacher/add', (req,res)=> {
    res.render('addTeacher.ejs')
})

routes.post('/teacher', function(req,res){
    model.Teacher.create({
        firts_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        SubjectId: req.body.SubjectId

    })
    .then(() => {
        res.redirect('/teacher')
    })
   
})

module.exports = routes