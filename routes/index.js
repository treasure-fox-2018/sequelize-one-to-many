'use strict'

const routes = require('express').Router()
const ejs = require('ejs')
const path = require('path')

routes.get('/', (req, res) => {
    res.render('homepage')
})

module.exports = routes
