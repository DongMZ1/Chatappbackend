const express = require('express');
const router = express.Router();
const User = require('../schema/User');

router.post('/login', async (req, res, next) =>{
       const {username} = req.body();
       const {email, password} = req.body();
       /* */
       const existinguser = await User.findOne({username: username});
       if(!existinguser){
           const error = new Error('User Name does not exist, please sign up instead');
           error.status = 401;
           return next(error);
       }


})
module.exports = router;