const express = require('express');
const { createRecord, getRecord, deleteRecord, updateRecord} = require("../controller/record.js");
const token  = require("../middleware/token.js");


const router = express.Router();

//create attend
router.post('/data', token, createRecord);

// getrecord
router.get('/get', token, getRecord); 

// delete attend
router.delete('/:id', token, deleteRecord); 

// update attend
router.put('/:id', token, updateRecord); 


module.exports = router;