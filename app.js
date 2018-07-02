'use strict'
const express = require('express');
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
var port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }));
const routes = require('./routes/index.js')


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')));

app.set('views', path.join(__dirname, 'views'));


app.use('/', routes)


app.listen(port, () => {


    console.log(`server is connecting to port ${port}....`)

})

module.exports = app