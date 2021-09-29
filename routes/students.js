const express = require('express')
const Student = require('../models/student')
const Book = require('../models/book')
const router = express.Router()

//New Student
router.get('/new',(req,res)=>{
    res.render('students/new',{
        student:new Student()
    })
})

//Create Student
router.post('/',async(req,res)=>{
    const student = new Student({
        name:req.body.name,
        rno:req.body.rno,
        department:req.body.department
    })
    try{
        const newStudent = await student.save()
        res.redirect(`students/${newStudent.id}`)
        //res.redirect('/')
    }catch{
        res.render('students/new',{
            student:student
            //errorMessage:"Something went wrong!"
        })
    }
})

//Show page
router.get('/:id',async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id)
        const books = await Book.find({student:student.id}).limit(6).exec()
        res.render('students/show',{
            student:student,
            booksAccessed:books
        })
    }catch{
        res.redirect('/')
    }
})

module.exports = router