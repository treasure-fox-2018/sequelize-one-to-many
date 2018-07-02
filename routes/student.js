const express = require('express')
const app = express()
const Model = require('../models')

app.get('/', function(req, res) {
    Model.Student.findAll()
        .then(function(data) {
            res.render('student', {data})
        })
        .catch(function(err) {
            res.send(err)
        })
})

app.get('/add', function(req, res) {
    res.render('form_student')
})

app.post('/add', function(req, res) {
    let student = req.body

    Model.Student.create({
        first_name: student.firstName,
        last_name: student.lastName,
        email: student.email

    }).then(function() {
        res.redirect('/students')

    }).catch(function(err) {
        res.send(JSON.stringify(err))
    })
})

app.get('/delete/:id', function(req, res) {
    Model.Student.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect('/students')
    })
})

app.get('/edit/:id', function(req, res) {
    Model.Student.findById(req.params.id)
    .then(function(dataStudent) {
        res.render('editStudent', {dataStudent})
    })
    .catch(function(err) {
        res.send(err)
    })
})

app.post('/edit/:id', function(req, res) {
    Model.Student.update({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
    }, { where:
        {id: req.params.id}
    })
    .then(function() {
        res.redirect('/students')
    })
})

module.exports = app