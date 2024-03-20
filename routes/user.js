const express = require('express');
const { createUser, loginUser} = require("../controller/user.js");



const router = express.Router();

//create account
router.post('/', createUser);

//login user
router.post('/login', loginUser); 

// //data user
// router.get('/userData', token_auth, userData); 

module.exports = router;