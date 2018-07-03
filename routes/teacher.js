const express = require ('express')
const router = express.Router()
const Model = require('../models/')

router.get('/', (req,res) => {
    Model.Teacher.findAll({
        order: ['id'],
        include: [Model.Subject]
    })

    .then(dataTeacher => {
        console.log(JSON.parse(JSON.stringify(dataTeacher)))
        res.render('teacher', {dataTeacher: dataTeacher})
    })

    .catch(err => {
        res.send(err)
    })

})

router.get('/addteacher', (req,res) => {
    res.render('addteacher')
})

router.post('/addteacher', (req,res) => {
    //console.log(req.body);
    Model.Teacher.create({
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: req.body.Email
    })

    .then(() => {
        res.redirect('/teacher')
    })

    .catch(err => {
        res.send(err.message)
    })
})

router.get('/editteacher/:id', (req,res) => {
    Model.Teacher.findById(req.params.id)
    .then(Teacher => {
        Model.Subject.findAll()
        .then(Subject => {
            res.render('editteacher', {dataTeacher: Teacher, dataSubject: Subject}) // data asli: alias
        })
    })
})

router.post('/editteacher/:id', (req,res) => {
    //console.log(req.params.id)
    Model.Teacher.update({
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: req.body.Email,
        SubjectId: req.body.SubjectId
    },
    {
        where: { id: req.params.id }
    })

    .then(() => {
        res.redirect('/teacher')
    })

    .catch(err => {
        res.send(err)
    })
})

router.get('/deleteteacher/:id', (req, res) => {
    console.log(req.params.id)
    Model.Teacher.destroy({ where: { id: req.params.id } })
    .then(() => {
        res.redirect('/teacher')
    })

    .catch(err => {
        res.send(err)
    })
})

module.exports = router