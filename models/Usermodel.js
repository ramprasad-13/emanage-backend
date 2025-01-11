const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Use mongoose.model() to prevent overwriting an already compiled model
const User = mongoose.model('User', userSchema);

module.exports = User;
