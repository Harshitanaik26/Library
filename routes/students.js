const express = require('express')
const Student = require('../models/student')
const router = express.Router()

//New Student
router.get('/new',(req,res)=>{
    res.render('students/new',{
        student:new Student()
    })
})

module.exports = router