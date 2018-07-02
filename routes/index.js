'use strict'

const routes = require('express').Router()
const ejs = require('ejs')
const path = require('path')

const model = require('../models/')
const Teacher = model.Teacher
const Subject = model.Subject

routes.get('/', (req, res) => {
    res.render('homepage')
})

routes.get('/subject/add', (req, res) => {
    res.render('subject-add')
})

routes.post('/subject/add', (req, res) => {
    Subject.findAndCountAll({where: {subjectName: req.body.subjectName}})
    .then(findSubjectResult => {
        if (findSubjectResult >= 1) {
            console.log('Subject sudah ada')
            res.redirect('/subject/add')
        } else {
            Subject.create(
            {
                  subjectName: req.body.subjectName
            })
            .then( () => {
                res.redirect('/subject')
            })
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
})

routes.get('/teacher', (req, res) => {
    Teacher.findAll({include: [Subject]})
    .then(teachers => {
        res.render('teacher', {teachers: teachers})
    })
    .catch(err => {
        console.log(err)
    })
})

routes.get('/teacher/add', (req, res) => {
    Subject.findAll()
    .then(subjects => {
        res.render('teacher-add', {subjects: subjects})
    })
    .catch(err => {
        console.log(err)
    })
})

routes.post('/teacher/add', (req, res) => {
    let teacherFirstname = req.body.firstName
    let teacherLastname = req.body.lastName
    let teacherEmailArgs = req.body.email

    Subject.findOne({where: {subjectName: req.body.subjectChoose}})
    .then(subject => {
        Teacher.findAll({
                where: {
                  email: teacherEmailArgs}
            })
            .then(emailExists => {
                console.log(emailExists)

                if (emailExists.length >= 1) {
                    console.log('Email sudah ada!')
                    res.redirect('/teacher')
                } else {
                  Teacher.create({
                      firstName: teacherFirstname,
                      lastName: teacherLastname,
                      email: teacherEmailArgs,
                      SubjectId: subject.id,
                  })
                  .then(() => {
                      res.redirect('/teacher')
                  })
                  .catch(err => {
                      console.log(err)
                  })
                }
            })
            .catch(err => console.log(err))
    })
})

routes.get('/teacher/delete/:id', (req, res) => {
    Teacher.destroy({
        where: {id: req.params.id}
    })
    .then(() =>
        res.redirect('/teacher')
    )
    .catch(err => console.log(err))
})

routes.get('/teacher/edit/:teacherId', (req, res) => {
    let teacherId = req.params.teacherId

    Subject.findAll()
    .then(subjects => {
        Teacher.findById(teacherId)
        .then(teacher => {
          res.render('edit-teacher', {teacher:teacher, subjects:subjects})
        })
        .catch(err => console.log(err))
    })
})

routes.post('/teacher/edit/:teacherId', (req, res) => {
    let teacherId = req.params.teacherId

    let newTeacherFirstname = req.body.firstName
    let newTeacherLastname = req.body.lastName
    let newTeacherEmail = req.body.email

    Teacher.update(
      {
        firstName: newTeacherFirstname,
        lastName: newTeacherLastname,
        email: newTeacherEmail,
      }, {where: {id : teacherId}}
    )
    .then(() =>
        res.redirect('/teacher')
    )
    .catch(err => console.log(err))
})

routes.get('/subject', (req, res) => {
    Subject.findAll({include: [Teacher]})
    .then(subjects => {
        res.render('subject', {subjects: subjects})
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = routes
