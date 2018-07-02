'use strict'
const express = require('express')
const app = express()
const router = require('./routers')

app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.use('/', router)
app.listen(3000, () => {
    console.log('Listening to app 3000');
})