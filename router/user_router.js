const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const bcrypt = require('bcryptjs');
const {v4 : uuidv4} = require('uuid');

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

router.post('/requestfriend', async (req, res, next) =>{
     const {username, friendname} = req.body;
     const friend = await User.findOne({username: friendname});
     /*check if friendname is already your friend*/
     friend.messages.forEach( conversation => {
         if(conversation.friend === username){
             const err = new Error('The person you request is already your friend!');
             err.status = 401;
             return next(err);
         }
     });
    /*if a friend request is already sent */
     if(friend.friendrequest.includes(username)){
        const err = new Error('You already sent friend request');
        err.status = 401;
        return next(err);
     }

     friend.friendrequest.push(username);
     await friend.save();
     return res.status(201).json({friendlist: JSON.stringify(friend.friendrequest)});

});

router.post('/addfriend', async (req, res, next) =>{
       const {username, friendname} = req.body;
       /*init an uuid of room number for both user and friend */
       const roomnumber = uuidv4();
       const user = await User.findOne({username: username});
       const friend = await User.findOne({username: friendname});
      /*check the if the friend is already your friend */
       user.messages.forEach(
           conversation => {
               if(conversation.friend === friendname){
                   const err = new Error('The person you request is already your friend');
                   err.status = 401;
                   return next(err);
               }
           }
       );
       /*remove the username on friend request array */
       user.friendrequest.remove(friendname);
       await user.save(); 
       /*accept the user, and create a one-one message User.messages */
       user.messages.push({
            room: roomnumber,
            friend: friendname
       });
       friend.messages.push(
           {
               room: roomnumber,
               friend: username
           }
       )
       await user.save();
       await friend.save();   
       return res.status(201).json({room : roomnumber});
});





router.get('/getroom', async (req, res, next) =>{
    const {username} = req.body;
    const {friendname} = req.body;
    let room;
    return res.status(201).json({room: 'hello!'});
})

module.exports = router;