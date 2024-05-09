const mongoose = require('mongoose')

const Schema = mongoose.Schema

const libraryStudentSchema = new Schema({
    
    name :{
        type: String,
        required: true
    },
    roll_no :{
        type:Number,
        required:true
    },
} , {timestamps:true})

module.exports = mongoose.model('Students', libraryStudentSchema)
