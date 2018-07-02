
const express = require("express")
let app = express()
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
let teacher = require("./routes/teacherRoute")
let subject = require("./routes/subjectRoute")

app.get("/",function(req,res){
    res.send("homepage")
})

app.use("/",teacher)
app.use("/",subject)

app.listen(3000,function(){
    console.log("port 3000")
})