const express = require('express')
const models = require('../models')
const router = express.Router();
let Teacher = models.Teacher
let Subject = models.Subject


router.get('/', function (req, res) {
  Teacher.findAll({
      include: [{
        model: models.Subject
      }]
    })
    .then(function (teacher) {
      res.render('teachers', {
        teacher

      })

    })
    .catch(function (err) {
      console.log(err)
    })
})



//add
router.get('/add', function (req, res) {
  Subject.findAll()
    .then(function (subject) {
      res.render('teacher_add', {
        err: null,
        subject
      })
    })
})




router.post('/add', function (req, res) {
  console.log(req.body)
  Teacher.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      SubjectId: req.body.SubjectId
    })
    .then(function () {
      res.redirect('/teachers')
    })
    .catch(function (err) {
      Subject.findAll()
        .then(function (subject) {
          console.log(err)
          res.render('teacher_add', {
            err: err,
            subject: subject
          })

        })

    })



})



router.get("/edit/:id", (req, res) => {


  Teacher.findById(req.params.id, {
      include: [{
        model: models.Subject
    }]
    })
    .then(teacher => {

      Subject.findAll()
        .then(function (subject) {
          res.render("teacher_edit", {
            teacher,
            subject
          });
        })
        .catch(function (err) {
          console.log(err)
        })

    })





  // Teacher.findAll({
  //     include: [{
  //       model: models.Subject
  //     }]
  //   })
  //   .then(function (subject) {
  //     Subject.findAll()
  //       .then(function (subjectAll) {
  //         Teacher.findById(req.params.id)
  //           .then(teacher => {
  //             res.render("teacher_edit", {
  //               teacher,
  //               subjectAll
  //             });
  //           })
  //
  //           .catch(err => {
  //             console.log(err);
  //           });
  //
  //
  //
  //
  //       })
  //
  //
  //
  //
  //   }) //end




});



router.post("/edit/:id", (req, res) => {
  let teacher = req.body
  Teacher.update(teacher, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect("/teachers");
  });
});



router.get("/delete/:id", (req, res) => {
  Teacher.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect("/teachers");
    })
    .catch(err => {
      console.log(err);
    });
});









module.exports = router
