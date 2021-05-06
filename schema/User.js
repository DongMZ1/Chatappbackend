const mongoose = require('mongoose');

const User = mongoose.Schema(
    {
        username: {type: String, required: true},
        friends: [{type: String}], //other friends's username of this user
        password: {type: String, required: true},
        messages: [{
            users: {type: String}, // how many people in this conversation
            contents: [
                {
                     fromwho: {type: String},  //who speak the sentence
                     content: {type: String}   // the content of this sentence
                }
            ]
        }]
    }
)

module.exports = mongoose.model('User', User);