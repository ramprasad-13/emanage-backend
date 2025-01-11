const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  // Ensure email is unique for each attendee
    }
});

const Attendee = mongoose.model('Attendee', attendeeSchema);
module.exports = Attendee;
