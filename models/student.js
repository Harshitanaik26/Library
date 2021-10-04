const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rno:{
        type:Number,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        //required:true,
        ref:'Books'
    }
})

module.exports = mongoose.model('Student',studentSchema)