const app = require('express')();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const routes = require('./routes')

app.set('view engine','ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/',routes);



app.listen(3000,function(){
    console.log('App listening on port 3000')
});



