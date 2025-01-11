const Task = require('../../models/Task');
const Event = require('../../models/Event');
const Attendee = require('../../models/Attendee');

const createTask = async (req, res) => {
    const { name, deadline, status, event, assignedAttendees } = req.body;

    // Input validation: Check if all required fields are provided
    if (!name || !deadline || !status || !event || !assignedAttendees || assignedAttendees.length === 0) {
        return res.status(400).json({ error: 'All fields are required: name, deadline, status, event, and assignedAttendees' });
    }

    try {
        // Validate the event ID exists
        const existingEvent = await Event.findById(event);
        if (!existingEvent) {
            return res.status(400).json({ error: 'Event not found' });
        }

        // Validate that all attendees exist
        const attendees = await Attendee.find({ '_id': { $in: assignedAttendees } });
        if (attendees.length !== assignedAttendees.length) {
            return res.status(400).json({ error: 'One or more attendees not found' });
        }

        // Check if the task name already exists (optional)
        const existingTask = await Task.findOne({ name });
        if (existingTask) {
            return res.status(400).json({ error: 'A task with this name already exists' });
        }

        // Create a new task
        const task = new Task({
            name,
            deadline,
            status,
            event,
            assignedAttendees
        });

        // Save the task to the database
        await task.save();

        // Respond with the created task
        res.status(201).json(task);

    } catch (error) {
        // Error handling for unexpected issues
        res.status(400).json({ error: error.message });
    }
};

module.exports = createTask;
