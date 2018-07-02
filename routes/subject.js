const express = require('express')
const app = express()
const Model = require('../models')

app.get('/', function(req, res) {
    Model.Subject.findAll()
        .then(function(data) {
            res.render('subject', {data})
        })
        .catch(function(err) {
            res.send(err)
        })
})

app.get('/add', function(req, res) {
    res.render('form_subject')
})

app.post('/add', function(req, res) {
    let subject = req.body

    Model.Subject.create({
        subject_name: subject.subject_name

    }).then(function() {
        res.redirect('/subject')

    }).catch(function(err) {
        res.send(JSON.stringify(err))
    })
})

app.get('/edit/:id', function(req, res) {
    Model.Subject.findById(req.params.id)
    .then(function(dataSubject) {
        res.render('editSubject', {dataSubject})
    })
    .catch(function(err) {
        res.send(err)
    })
})

app.post('/edit/:id', function(req, res) {
    Model.Subject.update({
        subject_name: subject_name
    }, { where:
        {id: req.params.id}
    })
    .then(function() {
        res.redirect('/Subjects')
    })
})

module.exports = app