'use strict'

const routes = require('express').Router()
const ejs = require('ejs')
const path = require('path')

const model = require('../models/')
const Teacher = model.Teacher
const Subject = model.Subject

routes.get('/', (req, res) => {
    res.render('homepage')
})

routes.get('/teacher', (req, res) => {
    Teacher.findAll({include: [Subject]})
    .then(teachers => {
        res.render('teacher', {teachers: teachers})
    })
    .catch(err => {
        console.log(err)
    })
})

routes.get('/subject', (req, res) => {
    Subject.findAll({include: [Teacher]})
    .then(subjects => {
        res.render('subject', {subjects: subjects})
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = routes
