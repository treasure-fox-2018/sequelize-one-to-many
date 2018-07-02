'use strict'

const express = require ('express')
const app = express()
const bodyParser = require('body-parser')

const HomePage = require('./routes/homepage.js')
const Teacher = require('./routes/teacher.js')
const Subject = require('./routes/subject.js')
const addTeacher = require('./routes/addteacher.js')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', HomePage)
app.use('/teacher', Teacher)
app.use('/subject', Subject)
app.use('/teacher/addteacher', addTeacher)

app.listen(3000, console.log(`success`))