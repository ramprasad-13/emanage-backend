const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true  // Ensure task names are unique
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',  // Reference to Event model this task is associated with
        required: true
    },
    assignedAttendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee',  // Reference to Attendee model, attendees assigned to the task
        required: true
    }]
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
