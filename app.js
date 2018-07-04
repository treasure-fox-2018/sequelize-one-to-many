const express = require('express');
const app = express()
const bodyParser = require('body-parser')
// const model = requires('./models')
const routes = require('./routes/index.js');
const teacher = require('./routes/rTeacher.js');
const subject = require('./routes/rSubject.js');
const addTeacher = require('./routes/addTeacher.js');
const editTeacher = require('./routes/editTeacher.js')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',routes)
app.use('/', teacher);
app.use('/',subject);
app.use('/',addTeacher)
app.use('/', editTeacher)
// app.get('/', (req,res) =>  {
//     res.send('halo')
// })


// app.get('/teacher', function(req,res){
//     Teacher.findAll() => {

// }
// })

app.listen(3000, () => console.log('my express!'))