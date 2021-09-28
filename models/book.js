const mongoose = require('mongoose')
//const Students = require('./student')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    due:{
        type:Date
    }
})
//include student database if required
module.exports = mongoose.model('Books',bookSchema)