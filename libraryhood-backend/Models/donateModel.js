const mongoose = require('mongoose')

const Schema = mongoose.Schema

const libraryDBookSchema = new Schema({
    title :{
        type: String,
        required: true
    },
    author :{
        type: String,
        required:true
    },
    genre :{
        type: String,
        required:true
    },
    image :{
        type: String,
        default:  'https://images.squarespace-cdn.com/content/v1/5be49470c258b4964c9659d2/967c6e2b-36e6-4db4-a676-503e3a95ee2d/Capture.PNG',
        required: true

    }
} , {timestamps:true})

module.exports = mongoose.model('DBooks', libraryDBookSchema)
