const mongoose = require('mongoose');

const User = mongoose.Schema(
    {
        username: {type: String, required: true},
        email:{type: String, required: true},
        friends: [{type: String}],
        password: {type: String, required: true},
        messages: [{
            user: {type: String},
            contents: [
                {
                     fromwho: {type: String},
                     content: {type: String} 
                }
            ]
        }]
    }
)

module.exports = mongoose.model('User', User);