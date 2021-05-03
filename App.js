const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json())
app.use((req, res, next)=>{
    const error = new Error('url not find');
    error.status = 404;
   return next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status).json({message: error.message});
})

mongoose
  .connect(
    `mongodb+srv://Pikachu:518dmz518@cluster0.i4fyv.mongodb.net/CHATAPP?retryWrites=true&w=majorityy`
  )
  .then(() => {
    const server = app.listen(process.env.PORT || 5000);
    io = socket(server);
  })
  .catch(err => {
    console.log(err);
  });