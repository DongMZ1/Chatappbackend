const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res, next) =>{
       const {username} = req.body;
       /* */
       let existinguser;
       existinguser = await User.findOne({username: username});
       if(!existinguser){
        const newuser = new User(
            {   
                username           
            }
        );
        await newuser.save();
        return res.status(201).json({user: JSON.stringify(newuser)});
       }

       return res.status(201).json({user: JSON.stringify(existinguser)});
       

});



router.get('/getroom', async (req, res, next) =>{
    const {username} = req.body;
    const {friendname} = req.body;
    let room;
    return res.status(201).json({room: 'hello!'});
})

module.exports = router;