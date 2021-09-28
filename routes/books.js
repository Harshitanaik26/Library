const express = require('express')
const router = express.Router()
const Books = require('../models/book')


//New Route
router.get('/new',async(req,res)=>{
    //try{
        //const book = new Book()
        //res.render('books/new',{
            //book:book
        //})
    //}catch{
        //res.redirect('/books')
    //}
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