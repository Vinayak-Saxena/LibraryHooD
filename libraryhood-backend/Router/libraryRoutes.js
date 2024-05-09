const express = require('express')

const { addStudent ,getStudents, getStudent , removeStudent  } = require('../Controllers/libraryController')

const router = express.Router() 

// get all students
router.get('/' , getStudents)

// get a single student 
router.get('/:roll_no' ,getStudent) 

// add new student
router.post('/', addStudent )

// remove
router.delete('/:roll_no', removeStudent) 

module.exports = router