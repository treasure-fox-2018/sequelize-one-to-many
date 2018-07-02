const express = require('express')
const router  = express.Router()
const model = require('../models')

router.get('/subject',function(req,res){
    model.Subject.findAll({
        include: [model.Teacher]
    })
    .then((data_subject) => {
        res.render('subject', {dataSubject: data_subject})
    })
})

module.exports = router
