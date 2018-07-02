const express = require('express')
const models = require('../models')
const {
  Subject
} = models
const router = express.Router();


router.get('/', function (req, res) {

  Subject.findAll({
      include: {
        model: models.Teacher
      }
    })
    .then(function (subject) {

      res.render('subjects', {
        subject
      })
    })


})






module.exports = router
