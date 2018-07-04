const express = require('express')
const routes = express.Router()
const model = require('../models/')



routes.get('/teacher', function(req,res){
    model.Teacher.findAll(
        {include:[model.Subject]}
    )
    .then((data_teacher) => {
        res.render('teacher.ejs', {data_teacher})
        // res.json(data_teacher)
    })
})

router.get('/teacher/delete/:id', function(req,res) {
    model.Teacher.destroy(
        {where: {id:req.params.id}})
        .then(() => {
            res.redirect('/teacher')
        })
})







module.exports = routes