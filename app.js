const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Teacher = require('./routes/teacher')
const Subject = require('./routes/subject')

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',Teacher)
app.use('/',Subject)

app.get('/', function(req,res) {
    res.render('home')
})

app.listen(3000, console.log('Server is Running'))