const express = require('express')
const router = express.Router()

router.get('/teacher/addteacher', (req,res) => {
    res.render('addteacher')
})

module.exports = router