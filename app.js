const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const index = require('./routes/index.js')
const teacher = require('./routes/teacher.js')
const student = require('./routes/student.js')
const subject = require('./routes/subject.js')

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs')

app.use('/', index)
app.use('/teachers', teacher)
app.use('/students', student)
app.use('/subject', subject)

app.listen(3000, function() {
    console.log('online')
})