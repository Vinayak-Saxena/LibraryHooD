// const mongoose = require('mongoose')

// const Schema = mongoose.Schema

// const issuereturnSchema = new Schema({

//     student_name :{
//         type: String,       
//         required: true
//     },
//     student_roll :{
//         type: Number,
//         required:true
//     },
//     title :{
//         type: String,
//         required: true
//     },
    

// } , {timestamps:true})

// module.exports = mongoose.model('IssueReturn', issuereturnSchema)


const mongoose = require('mongoose')

const Schema = mongoose.Schema

const issueReturnSchema = new Schema({
    // title: {
    //     type: String,
    //     required: true
    // },
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Books',
        required:true
    },
    issued_date: {
        type: Date,
        required: true,
        // default: Date.now
    },
    returned_date: {
        type: Date,
        default: null 
    }
}, 
// { timestamps: true }
)

module.exports = mongoose.model('IssueReturn', issueReturnSchema)