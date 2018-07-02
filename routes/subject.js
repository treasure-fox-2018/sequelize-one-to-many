const express = require ('express')
const router = express.Router()
const Model = require('../models/')

router.get('/', (req,res) => {
    Model.Subject.findAll({
        include: [Model.Teacher]
    })
    
    .then(dataSubject => {
       // console.log(dataSubject)
        res.render('subject', {dataSubject: dataSubject})
    })

    .catch(err => {
        res.send(err)
    })
})

module.exports = router