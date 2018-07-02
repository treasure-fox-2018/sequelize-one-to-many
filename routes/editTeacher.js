const express = require('express');
const routes = express.Router();
const model = require('../models')

routes.get('/teacher',(req,res) => {
    res.render('teacher.ejs')
})

routes.get('/teacher/editTeacher', (req,res)=> {
    res.render('editTeacher.ejs')
})

routes.post('/teacher', function(req,res){
    model.Teacher.create({
        firts_name: req.body.firts_name,
        last_name: req.body.last_name,
        email: req.body.email,
        SubjectId: req.body.SubjectId

    })
    .then(() => {
        res.rediret('/teacher')
    })
    .catch(() => {
        res.render('./teacher/add',{error:err.message})
    })
})




module.exports = routes