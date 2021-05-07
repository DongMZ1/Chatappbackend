const mongoose = require('mongoose');

const User = mongoose.Schema(
    {
        username: {type: String, required: true},
        friendrequest: [{type: String}],
        messages: [{
            room: {type: String},
            friend: {type: String}, // to whom => username
            contents: [
                {
                     whospeak: {type: String},  //who speak the sentence
                     content: {type: String}   // the content of this sentence
                }
            ]
        }]
    }
)

module.exports = mongoose.model('User', User);