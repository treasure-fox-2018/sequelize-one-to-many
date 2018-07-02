const express = require ('express')
const app = express()
const routes = require('./routes/index')
const bodyParser = require("body-parser")

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use('/',routes)


app.listen(3000,function(){
  console.log('listen me');
})
