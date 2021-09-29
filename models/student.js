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
    }
})

module.exports = mongoose.model('Student',studentSchema)