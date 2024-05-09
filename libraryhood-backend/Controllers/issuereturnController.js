const IssueReturn = require('../Models/issuereturnModel')
const mongoose = require('mongoose')



// get all IssueReturn
const getRecords = async (req , res) => {
    const details = await IssueReturn.find({}).sort({createdAt: -1}).populate('student_id').populate('book_id')
    res.status(200).json(details)
}





const getRecord = async (req, res) => {
    const { student_id } = req.params; // Assuming 'student_roll' is in req.params

    const detail = await IssueReturn.find({ student_id }).populate('student_id').populate('book_id');

    if (!detail) {
        return res.status(404).json({ error: 'No such record' });
    }

    res.status(200).json(detail);
};






// create a workout
const addRecord = async (req , res) => {

    const { student_id , book_id , issued_date ,returned_date} = req.body

    // adding Book to db
    try{
        const detail =  await IssueReturn.create({ student_id , book_id , issued_date ,returned_date}) 
        res.status(200).json(detail) 
    }catch (error) {
        res.status(400).json({error: error.message})

    }
}




  const updateRecord = async (req, res) => {
    const { book_id } = req.params; // Assuming the book_id is passed in the URL parameters

    try {
        const detail = await IssueReturn.findOneAndUpdate(
            { book_id }, // Use book_id to find the correct record
            { $set: req.body },
            { new: true, upsert: true }
        );

        if (!detail) {
            return res.status(404).json({ error: 'No such record' });
        }

        res.status(200).json(detail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  


module.exports = {
    getRecords , getRecord , addRecord , updateRecord ,  
}

