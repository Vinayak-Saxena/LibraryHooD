const Students= require('../Models/libraryModel')
const mongoose = require('mongoose')



const getStudents = async (req , res) => {
    const students = await Students.find({}).sort({createdAt: -1})
    res.status(200).json(students)
}


const getStudent = async (req, res) => {
    const { roll_no } = req.params;

    const student = await Students.findOne({ roll_no });

    if (!student) {
        return res.status(404).json({ error: 'No such student found' });
    }

    res.status(200).json(student);
}






const addStudent = async (req , res) => {

    const {name , roll_no} = req.body


    try{
        const student =  await Students.create({name , roll_no}) 
        res.status(200).json(student) 
    }catch (error) {
        res.status(400).json({error: error.message})

    }
}



const removeStudent = async (req, res) => {
    const { roll_no } = req.params;

    if (!roll_no) {
        return res.status(400).json({ error: 'Roll number not provided' });
    }

    try {
        const student = await Students.findOneAndDelete({ roll_no });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove the student' });
    }
};







module.exports = {
    addStudent , getStudents ,getStudent ,removeStudent,
}