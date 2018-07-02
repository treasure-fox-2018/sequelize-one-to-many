const homepage = require('express').Router();

homepage.get('/', (req, res) => {
  res.render('homepage')
})

module.exports = homepage