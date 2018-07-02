const express = require("express")
const app = express()
const routes = require("./routes/index")

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use("/", routes)


app.listen(3000, function(){
    console.log("listen 3000")
})

