const express = require('express');
const routes = express.Router();
const model = require('../models')

routes.get('/teacher',(req,res) => {
    res.render('teacher.ejs')
})


router.get('/teacher/edit/',function(req,res){
    model.Teacher.findById(req.params.id)
    .then((data_teacher) => {
        res.render('/editTeacher.ejs', {err: null,data_teacher: data_teacher})
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
        res.redirect('/teacher.ejs')
    })
    .catch((err) => {
        console.log(err)
        res.render('editTeacher', {err:err.message, data_teacher: null})
    })
})



// routes.post('/teacher', function(req,res){
//     model.Teacher.create({
//         firts_name: req.body.firts_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         SubjectId: req.body.SubjectId

//     })
//     .then(() => {
//         res.rediret('/teacher')
//     })
//     .catch(() => {
//         res.render('./teacher/editTeacher',{error:err.message})
//     })
// })




module.exports = routes