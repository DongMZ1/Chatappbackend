const mongoose = require('mongoose');

const User = mongoose.Schema(
    {
        username: {type: String, required: true},
        friends: [{type: String}], //other friends's username of this user
        password: {type: String, required: true},
        messages: [{
            room: {type: String},
            friend: {type: String}, // to whom
            contents: [
                {
                     isuser: {type: Boolean},  //who speak the sentence
                     content: {type: String}   // the content of this sentence
                }
            ]
        }]
    }
)

module.exports = mongoose.model('User', User);