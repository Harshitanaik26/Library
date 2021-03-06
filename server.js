if(process.env.NODE_ENV!='production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexrouter = require('./routes/index')
const booksrouter = require('./routes/books')
const studentsrouter = require('./routes/students')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.set(express.static('public'))
app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useUnifiedTopology:true
})
const db = mongoose.connection
db.on('error',error=>{
    console.log(error)
})
db.once('open',()=>{
    console.log('Connected to Mongoose')
})

app.use('/',indexrouter)
app.use('/books',booksrouter)
app.use('/students',studentsrouter)

app.listen(process.env.PORT||3000)