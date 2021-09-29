const express = require('express')
const router = express.Router()
const Books = require('../models/book')
const Student = require('../models/student')


//New Route
router.get('/new',async(req,res)=>{
    renderNewPage(res,new Books())
})

//create route
router.post('/',async(req,res)=>{
    const book = new Books({
        title: req.body.title,
        quantity: req.body.quantity
    })
    try{
        const newBook = await book.save()
        //res.redirect(`books/${newBook.id}`)
        res.redirect('/')
    }catch{
        renderNewPage(res,book,hasError=true)
    }
})

//Show Page
router.get('/:id',async(req,res)=>{
    try{
        const book = await Books.findById(req.params.id).exec()
        res.render('books/show',{book:book})
    }catch{
        res.redirect('/')
    }
})


async function renderNewPage(res,book,hasError=false){
    try{
        //const book = new Book()
        const params = {
            book:book
        }
        if(hasError) params.errorMessage = "Error Creating Book"
        res.render('books/new',params)
    }catch{
        res.redirect('/books')
    }
}

module.exports = router