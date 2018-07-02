const express = require('express')
const router  = express.Router()
const model = require('../models')

router.get('/subjects',function(req,res){
    model.Subject.findAll({
        include: [model.Teacher]
    })
    .then((data_subject) => {
        // console.log(data_subject[1].Teachers)
        res.render('subject', {dataSubject: data_subject})
    })
})

module.exports = router