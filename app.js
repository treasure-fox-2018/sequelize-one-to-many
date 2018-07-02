const express = require('express')
const app = express()
let route = require('./routes')
let teacher = require('./routes/teachers')
let subject = require('./routes/subjects')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))

let ejs = require('ejs')
app.set('view engine', 'ejs')

app.use('/', route)
app.use('/subjects', subject)
app.use('/teachers', teacher)
app.listen(3000, () => console.log('Example app listening on port 3000!'))
