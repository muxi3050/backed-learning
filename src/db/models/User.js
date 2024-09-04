const mongoose = require('../mongodb');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:String,
    realname:String
});

const User = mongoose.model('users', userSchema);

module.exports = User;