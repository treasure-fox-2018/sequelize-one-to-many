const express = require ('express')
const router = express.Router ()

router.get('/', function (reg,res) {
    res.render('mainPage.ejs')
})

module.exports = router