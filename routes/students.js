const express = require('express')
//const student = require('../models/student')
const router = express.Router()
const Student = require('../models/student')
const Book = require('../models/book')

//All students route
router.get('/index',async(req,res)=>{
    let searchOptions = {}
    if(req.query.name!= null && req.query.name!=''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try{
        const students = await Student.find(searchOptions)
        res.render('students/index',{
            students:students,
            searchOptions:req.query })

    }catch{
        res.redirect('/')
    }

})

//New Page
router.get('/new',async(req,res)=>{
    renderNewPage(res,new Student())
})

//create route
router.post('/',async(req,res)=>{
    const student = new Student({
        name: req.body.name,
        rno: req.body.rno,
        department: req.body.dept,
        quantity: req.body.quantity,
        books:req.body.book
    })
    try{
        const newStudent = await student.save()
        res.redirect(`students/${newStudent.id}`)
        //res.redirect('/')
    }catch(err){
        console.log(err)
        renderNewPage(res,student,hasError=true)
    }
})

//Show Page
router.get('/:id',async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id).exec()
        res.render('students/show',{student:student})
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})

async function renderNewPage(res,student,hasError=false){
    try{
        //const books = await Book.find()
        const params = {
            student:student,
            //books:books
        }
        /*if(hasError) params.errorMessage = "Error Creating Book"*/
        res.render('students/new',params)
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
}

module.exports = router