// entry point

const express = require('express')
let app = express ()
let ejs = require('ejs')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

// mainpage
app.use('/', require ('./routes/index.js'))

// subject
app.use('/subject', require('./routes/subject.js'))

// teacher
app.use('/teacher', require('./routes/teacher.js'))

// student
app.use('/student', require('./routes/student.js'))

app.listen(3000)