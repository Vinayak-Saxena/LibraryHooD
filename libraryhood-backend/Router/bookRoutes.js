const express = require('express')

const { addBook ,getBooks, getBook , removeBook,updateBook } = require('../Controllers/bookController')

const router = express.Router() 

// get all Books
router.get('/' , getBooks)

// get a single Book 
router.get('/:title' ,getBook) 

// add new Book
router.post('/', addBook )

    // update
router.patch('/:title',updateBook)

// remove
router.delete('/:id', removeBook) 

module.exports = router