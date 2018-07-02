    const express = require('express')
    const app = express()
    const model = require('./models')
    const Teacher = model.Teacher
    const Subject = model.Subject

    app.set('view engine','ejs')
    app.use(express.urlencoded({extended: false}))

    app.get('/',function(req,res){
        // res.send("wellcome")
        res.render('home')
    })

    app.get('/teachers',function(req,res){
        Teacher.findAll({include:[Subject]})
        .then(function(teachers){
            res.render('teacher_table',{teachers:teachers})
        })
        .catch(function(err){
            console.log(err); 
        })
    })

    app.get('/subjects',function(req,res){
        Subject.findAll({include:[Teacher]})
        .then(function(subjects){
            res.render('subject_table',{subjects:subjects})
        })
        .catch(function(err){
            console.log(err);
        })
    })

    app.get('/teacher/add',function(req,res){
        res.render('teacher_form',{error:null})
    })

    app.post('/teacher/add',function(req,res){
        Teacher.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            SubjectId:req.body.SubjectId
        })
        .then(function(teacher){
            res.redirect('/teachers')
        })
        .catch(function(err){
            res.render('teacher_form',{error:err.message})
        })
    })

    app.get('/teacher/edit/:id',function(req,res){
        Teacher.findById(req.params.id)
        .then(function(teacher){
            // res.json(teacher)
            Subject.findAll()
            .then(function(subject){
                res.render('teacher_edit',{teacher:teacher,subject:subject,error:null})
            })
            .catch(function(err){
                res.send(err)
            })
        })
        .catch(function(err){
            res.send(err.message)
        })
    })

    app.post('/teacher/edit/:id',function(req,res){
        // res.send(req.body.firstName)
        
        Teacher.findById(req.params.id)
        .then(function(teacher){
            if(teacher.email==req.body.email){
                Teacher.update({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    SubjectId:req.body.SubjectId
                },{
                    where : {id:req.params.id}
                })
                .then(function(teacherId){
                    // res.json(teacher)
                    res.redirect('/teachers')
                })
                .catch(function(err){
                        // res.json(teacher)
                    Subject.findAll()
                    .then(function(subject){
                        res.render('teacher_edit',{teacher:teacher,subject:subject,error:err.message})
                    })
                    .catch(function(err){
                        res.send(err)                        
                    })
                })
            }
            else{
                Teacher.update({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email,
                    SubjectId:req.body.SubjectId
                },{
                    where : {id:req.params.id}
                })
                .then(function(teacher){
                    // res.json(teacher)
                    res.redirect('/teachers')
                })
                .catch(function(err){
                    // res.json(teacher)
                    Subject.findAll()
                    .then(function(subject){
                        res.render('teacher_edit',{teacher:teacher,subject:subject,error:err.message})
                    })
                    .catch(function(err){
                        res.send(err)                        
                    })
                })
            }
        })
        .catch(function(err){
            res.send(err)
        })  
    })

    app.listen(3000)