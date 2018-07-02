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







module.exports = routes