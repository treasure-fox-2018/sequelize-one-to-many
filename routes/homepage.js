const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.render('homepage')
})

module.exports = routes