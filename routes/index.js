const express  = require("express")
const routes = express.Router()
const model = require("../models")


routes.get("/teachers", function(req,res){
   
    model.Teacher
    .findAll({
        include:[{
            model : model.Subject
        }],
        order:[['id','asc']]
    })
    .then(function(teachers){
        res.render("teachers", {teachers:teachers})
    })
    .catch(function(err){
        res.send(err)
    })
})

routes.get("/teachers/add", function(req,res){
    let teachers = model.Teacher.findAll()
    let subjects = model.Subject.findAll()
    
    Promise.all([teachers,subjects]).then(function(values) {
        res.render("addTeachers", {teachers:values[0],subjects:values[1],error:null})
    });
      
})

routes.post("/teachers/add",function(req,res){
    model.Teacher
    .create({
        firstName :req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        SubjectId :req.body.SubjectId
    })
    .then(function(teacher){
        res.redirect("/teachers")
    })
    .catch(function(err){
        res.json(err)
    })
})

routes.get("/teachers/edit/:id",function(req,res){
    model.Teacher
    .findById(req.params.id)
    .then(function(teacher){
       return teacher
    })
    .then(function(teacher){
        model.Subject
        .findAll()
        .then(function(subjects){
            res.render("editTeacher", {
                teacher:teacher,
                subjects:subjects,
                error:null})
        })
        .catch(function(err){
            res.json(err)
        })
    })
    .catch(function(err){
        res.json(err)
    })
})


routes.post("/teachers/edit/:id", function(req,res){
    model.Teacher
    .findById(req.params.id)
    .then(function(teacher){     
        model.Teacher
        .update({
            id : req.params.id,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            SubjectId : req.body.SubjectId,        
        },{
            where:{id:req.params.id}
        })
        .then(function(teacher){
            res.redirect("/teachers")
        })
        .catch(function(error){
            model.Teacher
            .findById(req.params.id)
            .then(function(teacher){
               return teacher
            })
            .then(function(teacher){
                model.Subject
                .findAll()
                .then(function(subjects){
                    res.render("editTeacher", {
                        teacher:teacher,
                        subjects:subjects,
                        error:error.message})
                })
                .catch(function(err){
                    res.json(err)
                })
            })
            .catch(function(err){
                res.json(err)
            })
        })
    })
    .catch(function(err){
        res.send(err)
    })
})

routes.get("/subjects", function(req,res){
    model.Subject
    .findAll({
        include : [{
            model : model.Teacher
        }]
    })
    .then(function(subjects){
        res.render("subjects", {subjects:subjects})
    })
    .catch(function(err){
        res.json(err)
    })
})

routes.get("/teachers/delete/:id", function(req,res){
    model.Teacher
    .destroy({
        where:{
            id:req.params.id
        }
    })
    .then(function(teacher){
        res.redirect("/teachers")
    })
    .then(function(err){
        res.json(err)
    })
})

module.exports = routes
