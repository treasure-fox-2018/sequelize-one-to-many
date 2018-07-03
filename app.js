const express = require('express')
const app = express()
const port = 3000
const models = require('./models')
const bodyParser = require('body-parser')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))


app.listen(port ,function () {
  console.log("server is running on port",port)
})
//we don't need to separes the routes yet, maybe tommorow we use separates routes folder
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/teachers', (req, res) => {
  models.Teacher.findAll({
    order: [["id", "ASC"]],
    include : [models.Subject]
  }
   
  )
  .then (dataTeachers => {
    res.render('./teacher/index', { dataTeachers : dataTeachers, error : null})
  })
  .catch(err => {
    res.render('./teacher/index', { dataTeachers: [], error : err.message})
  })
})


app.get('/teachers/add', (req, res) => {
  res.render('./teacher/add', {dataTeacher : {} , error : null})
})

app.post('/teachers/add', (req, res) => {
  models.Teacher.create ({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    SubjectId : req.body.SubjectId
  })
    .then(() => {
       res.redirect('/teachers')
    })
    .catch(err => {
      res.render('./teacher/add', {dataTeacher : req.body , error : err.message})
    })
})

app.get('/teachers/edit/:id', (req, res) => {
  models.Teacher.findById(req.params.id)
    .then(dataTeacher => {
      res.render('./teacher/edit', {dataTeacher : dataTeacher , error : null})
    })
    .catch(err => {
      res.render('./teacher/edit', {dataTeacher : [] , error : err.message})
    })
})

app.post('/teachers/edit/:id', (req, res) => {
  models.Teacher.update(
    {
      id : req.params.id,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      SubjectId : req.body.SubjectId
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => {
      res.redirect('/teachers')
    })
    .catch(err => {
      res.render('./teacher/edit', {dataTeacher : req.body , error : err.message})
    })
})

app.get('/teachers/delete/:id', (req, res) => {
  models.Teacher.destroy({
    where: {
      id: req.params.id
    }
    })
    .then(deleteTeacher => {
      res.redirect('/teachers')
    })
    .catch(err => {
      res.render('./teacher/index', { dataTeachers: [], error : err.message})
    })
})  


app.get('/subjects', (req, res) => {
  models.Subject.findAll({
    order: [["id", "ASC"]],
    include : [models.Teacher]
  }
   
  )
  .then (dataSubjects => {
    res.render('./subject/index', { dataSubjects : dataSubjects, error : null})
  })
  .catch(err => {
    res.render('./subject/index', { dataSubjects: [], error : err})
  })
})

app.get('/subjects/add', (req, res) => {
  res.render('./subject/add', {dataSubject : {} , error : null})
})

app.post('/subjects/add', (req, res) => {
  models.Subject.create ({
    subjectName : req.body.subjectName
  })
    .then(() => {
       res.redirect('/subjects')
    })
    .catch(err => {
      res.render('./subject/add', {dataSubject : req.body , error : err.message})
    })
})

app.get('/subjects/edit/:id', (req, res) => {
  models.Subject.findById(req.params.id)
    .then(dataSubject => {
      res.render('./subject/edit', {dataSubject : dataSubject , error : null})
    })
    .catch(err => {
      res.render('./subject/edit', {dataSubject : [] , error : err.message})
    })
})

app.post('/subjects/edit/:id', (req, res) => {
  models.Subject.update(
    {
      subjectName : req.body.subjectName
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.render('./subject/edit', {dataSubject : req.body , error : err.message})
    })
})

app.get('/subjects/delete/:id', (req, res) => {
  models.Subject.destroy({
    where: {
      id: req.params.id
    }
    })
    .then(deleteSubject => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.render('./subject/index', { dataSubject: [], error : err.message})
    })
})  