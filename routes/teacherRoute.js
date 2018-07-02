const express = require("express")
const model = require("../models")
var Subject = model.Subject
var Teacher = model.Teacher
const routes = express.Router()


routes.get("/teacher",function(req,res){
    Teacher.findAll({include:[Subject],order : [["id","ASC"]]})
    .then(function(allData){
        // res.json(allData)
        res.render("data_teacher",{allData : allData})
    })
    .catch(function(err){
        res.json(err)
    })
})

routes.get("/teacher/add",function(req,res){
    Subject.findAll()
    .then(function(subject){
        // res.render("edit_teacher",{subject : subject})
        res.render("teacher_add",{err : null,subject : subject})
    })
})

routes.post("/teacher/add",function(req,res){
    Teacher.create({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        subject_id : req.body.subject_id
    })
    .then(function(){
        res.redirect("/teacher")
    })
    .catch(function(err){
        // res.render("teacher_add",{teacher_add,err :err.message })
        // res.send("email eror")
        // res.render("teacher_add",{err :err.message})
        // console.log(err)
        Subject.findAll()
        .then(function(subject){
            res.render("teacher_add",{subject : subject,err:err.message})
        })
    })
})

routes.get("/teacher/:id/edit",function(req,res){
    Teacher.findById(req.params.id,{
        include : [Subject]
    })
    .then(function(allData){
        // res.render("edit_teacher",{allData : allData,err : null})
        Subject.findAll()
        .then(function(subject){
            res.render("edit_teacher",{subject : subject,allData : allData,err:null})
        })
        .catch(function(err){
            res.json(err)
        })
    })
})

routes.post("/teacher/:id/edit",function(req,res){
    Teacher.update({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        subject_id :req.body.subject_id
    },{
        where : { id : req.params.id}
    })
    .then(function(){
    
            res.redirect("/teacher")

    })
    .catch(function(err){
        Teacher.findById(req.params.id)
        .then(allData=>{
            // res.render("edit_teacher",{allData:allData,err : err.message})
            Subject.findAll()
            .then(function(subject){
                res.render("edit_teacher",{subject : subject,allData : allData,err: err.message})
            })
        })
    })

    routes.get("/teacher/:id/edit_subject",function(req,res){
        Teacher.findById(req.params.id)
        .then(function(dataSubject){
            res.render("edit_subject_only",{dataSubject : dataSubject,err : null})
        })
    })
    
    routes.post("/teacher/:id/edit_subject",function(req,res){
        Teacher.update({
            subject_id : req.body.subject_id
        },{
            where : {id:req.params.id}
        })
        .then(function(){
            res.redirect("/teacher")
        })
        .catch(function(err){
            Subject.findById(req.params.id)
            .then(function(dataSubject){
                res.render("edit_subject_only",{dataSubject : dataSubject,err : err.message})
            })
        })
    })

})


module.exports = routes