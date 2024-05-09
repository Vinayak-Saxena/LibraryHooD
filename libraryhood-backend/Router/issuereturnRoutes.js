const express = require('express')

const { getRecords , getRecord , addRecord , updateRecord   } = require('../Controllers/issuereturnController')

const router = express.Router() 

router.get('/' , getRecords)


router.get('/:student_id' ,getRecord) 


router.post('/', addRecord )


router.patch('/:book_id', updateRecord)
  

module.exports = router