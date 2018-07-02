const express = require('express')
const app = express()
const Model = require('../models')

app.get('/', function(req, res) {
    Model.Teacher.findAll()
        .then(function(data) {
            res.render('teacher', {data})
        })
        .catch(function(err) {
            res.send(err)
        })
})

app.get('/add', function(req, res) {
    res.render('form_teacher')
})

app.post('/add', function(req, res) {
    let teacher = req.body

    Model.Teacher.create({
        first_name: teacher.firstName,
        last_name: teacher.lastName,
        email: teacher.email

    }).then(function() {
        res.redirect('/teachers')

    }).catch(function(err) {
        res.send(JSON.stringify(err))
    })
})


app.get('/delete/:id', function(req, res) {
    Model.Teacher.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect('/teachers')
    })
})

app.get('/edit/:id', function(req, res) {
    Model.Teacher.findById(req.params.id)
    .then(function(dataTeacher) {
        res.render('editTeacher', {dataTeacher})
    })
    .catch(function(err) {
        res.send(err)
    })
})

app.post('/edit/:id', function(req, res) {
    Model.Teacher.update({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
    }, { where:
        {id: req.params.id}
    })
    .then(function() {
        res.redirect('/teachers')
    })
})

module.exports = app