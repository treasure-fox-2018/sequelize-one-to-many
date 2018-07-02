const express = require('express')
const routes = express.Router()
const model = require('../models/')


routes.get('/subject', function(req,res){
    model.Subject.findAll()
    .then((data_subject) => {
        res.render('subject.ejs', {data_subject:data_subject})
            // res.json(data_subject)
    })
})





module.exports = routes