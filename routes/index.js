const express = require ('express')
let router = express.Router ()
const ejs = require ('ejs')

router.get('/', function (reg,res) {
    res.render('mainPage.ejs')
})


module.exports = router