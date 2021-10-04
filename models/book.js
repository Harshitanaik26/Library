const mongoose = require('mongoose')

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
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        //required:true,
        ref:'Student'
    }
})
module.exports = mongoose.model('Books',bookSchema)