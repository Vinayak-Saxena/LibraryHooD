const DBooks = require('../Models/donateModel')
const mongoose = require('mongoose')



// get all Donated Books
const getDBooks = async (req , res) => {
    const dbooks = await DBooks.find({}).sort({createdAt: -1})
    res.status(200).json(dbooks)
}


// get a single Donated Book

const getDBook = async (req ,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Book found'})
    }

    const dbook = await DBooks.findById(id)

    if (!dbook){
        res.status(404).json({error:'No such book'})
    }
    res.status(200).json(dbook)
}



const addDBook = async (req , res) => {

    const {title , author , genre , image} = req.body

    // adding Book to db
    try{
        const dbook =  await DBooks.create({title , author , genre , image}) 
        res.status(200).json(dbook) 
    }catch (error) {
        res.status(400).json({error: error.message})

    }
}

const removeDBook = async(req ,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such dbook'})
    }
    const dbook = await DBooks.findByIdAndDelete({_id : id})

    if (!dbook){
        res.status(404).json({error:'No such dbook'})
    }
    res.status(200).json(dbook)
}


module.exports = {
    addDBook , getDBooks ,getDBook ,removeDBook,
}