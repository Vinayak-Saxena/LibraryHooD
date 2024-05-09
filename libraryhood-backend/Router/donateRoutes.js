const express = require('express')

const { addDBook ,getDBooks, getDBook , removeDBook  } = require('../Controllers/donateController')

const router = express.Router() 

// get all Books
router.get('/' , getDBooks)

// get a single Book 
router.get('/:id' ,getDBook) 

// add new Book
router.post('/', addDBook )

// remove
router.delete('/:id', removeDBook) 

module.exports = router