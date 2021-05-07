const express = require('express');
const socketio = require('socket.io');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const mongoose = require('mongoose');
const io = require('socket.io')(server, { cors: {origin: '*'}})
const userrouter = require('./router/user_router');


app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });
app.use('/api/user', userrouter);
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
    `mongodb+srv://Pikachu:518dmz518@cluster0.i4fyv.mongodb.net/CHATAPP?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(process.env.PORT || 5000);
    console.log('Express server launching..')
  }).then(
    ()=>{
      /*
      io.on('connection', socket => {
        socket.emit('message', 'Connect to server');
        socket.on('message', message => {
          console.log(message);
        })
      })
      */
    }
  )
  .catch(err => {
    console.log(err);
  });