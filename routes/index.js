const routes = require('express').Router();
const models = require('../models')
const student = require('./student');
const teacher = require('./teacher');
const subject = require('./subject');

routes.get('/', (req, res) => {
  res.render("home",{title:'Welcome to our home page!',links:'please click the desired link below:'})
})

routes.get('/')
routes.use(student)
routes.use(teacher)
routes.use(subject)


module.exports = routes;
