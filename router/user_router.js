const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res, next) =>{
       const {username} = req.body;
       const {password} = req.body;
       /* */
       let existinguser;
       existinguser = await User.findOne({username: username});
       if(!existinguser){
           const error = new Error('User Name does not exist, please sign up instead');
           error.status = 401;
           return next(error);
       }

       const passwordiscorrect = await bcrypt.compare(password, existinguser.password);

       if(!passwordiscorrect){
        const error = new Error('password is not correct, please try again!');
        error.status = 401;
        return next(error);
       }

       return res.status(200).json({user: JSON.stringify(existinguser)});
       

});

router.post('/signup', async (req, res, next) =>{
       const {username} = req.body;
       const {password} = req.body;
       const hashedpassword = await bcrypt.hash(password, 10);
       /* */
       let existinguser;
       try{
        existinguser = await User.findOne({username: username});
       }catch(err){
           console.log(err.message);
       }
       if(existinguser){
        const error = new Error('User Name already exist, please login in instead');
        error.status = 401;
        return next(error);
    }
    const newuser = new User(
        {   
            username: username,
            password: hashedpassword,
            
        }
    );

   try{
    await newuser.save();
   }catch(err){
    const error = new Error(err.message);
    error.status = 401;
    return next(error);
   };
    return res.status(201).json({newuser: 'hello!'});
})

module.exports = router;