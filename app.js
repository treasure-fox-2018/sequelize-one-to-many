const express = require('express')
const app = express()
const Models = require('./models')
const bodyParser = require('body-parser')
var urlencodedParser = require('urlencoded-parser'); // ES5

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    // res.send('connect')
    res.render('homepage', {school: 'SMKN 1 Karawang'})
})

app.get('/teacher' , (req, res) => {
    Models.Teacher.findAll({ 
        include: [Models.Subject],
        order: [
            ['id', 'ASC']
        ]
    })
    .then(function(dataTeachers) {
        // res.send(dataTeachers)
        // console.log(dataTeachers);
        res.render('teacher', {dataTeacher: dataTeachers})

    })
})

app.get('/teacher/add', (req, res) => {
    Models.Subject.findAll()
    .then(subject => {
        console.log(subject);
        res.render('register_teacher', {subject:subject}) // this file ejs
    })
})

app.post('/teacher/add', (req, res) => {
    // console.log(req.body);
    Models.Teacher.create ({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        SubjectId: req.body.SubjectId
    })
    .then((teacher)=> {
        // console.log('======>',req.body.SubjectId);
        res.redirect('/teacher') // will search get
    })
    .catch((err) => {
        // res.json(err)
        Models.Subject.findAll()
        .then(subject => {
            res.render('register_teacher', {err:err.message, subject:subject}) //subject will be define
        })
    })
})

app.get('/teacher/edit/:id', (req, res) => {
    let id = req.params.id
    Models.Teacher.findById(id)
    .then(data => {
        res.render('edit_teacher', {data:data})
    })
    .catch(err => {
        res.send(err)
    })
app.post('/teacher/edit/:id', (req, res) => {
    
    Models.Teacher.update({
        first_name: req.body.newFirstName,
        last_name: req.body.newLastName,
        email: req.body.newEmail,
    }, {
        where: {id:req.params.id}
    })
    .then(updateDataTeacher => {
        res.redirect('/teacher')
    })
    .catch(err => {
        res.send(err)
    })
})
})

app.get('/teacher/delete/:id', (req, res) => {
    Models.Teacher.destroy({
        where:{id:req.params.id} // for take id
    })
    .then(deleteDataTeacher => {
        res.redirect('/teacher')
    })
    .catch(err => {
        res.send(err)
    })
})

app.get('/subjects', (req, res) => {
    Models.Subject.findAll({
        include: [Models.Teacher]
    })
    .then(subjects => {
        // console.log(subjects.Teacher);
        console.log(subjects);
                
        res.render('subjects.ejs', {subjects:subjects}) // data from subjects dploy to subject.ejs
    })
})




app.listen(3000, () => {
    console.log('connect with port 3000'); 
})