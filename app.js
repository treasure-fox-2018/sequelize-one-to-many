const express = require('express');
const app = express();

const homepage = require('./routes/homepage');
const teachers = require('./routes/teacher');
const subjects = require('./routes/subject');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended : false }));
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.use(homepage);
app.use(teachers);
app.use(subjects);

var server = app.listen(3000, () => {
  console.log('listening to port', server.address().port)
})
