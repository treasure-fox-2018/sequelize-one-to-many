const express = require ('express')
const router = express.Router()
const Model = require('../models/')

router.get('/', (req,res) => {
    Model.Teacher.findAll({
        include: [Model.Subject]
    }).then(dataTeacher => {
        //console.log(dataTeacher)
        res.render('teacher', {dataTeacher: dataTeacher})
    })
})

module.exports = router