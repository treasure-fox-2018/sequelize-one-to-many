const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routesIndex = require('./routes')
const routesTeacher = require('./routes/teacher')
const routesSubject = require('./routes/subject')
const port = 3030

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs')

app.use(routesIndex)
app.use(routesTeacher)
app.use(routesSubject)

app.listen(port, (err) => {
  console.log(`Listening app on port http://localhost:${port}`);
})