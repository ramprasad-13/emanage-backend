const Task = require('../../models/Task');

const getTasks = async (req, res) => {
    const { event, attendee } = req.query;  // Get filter query parameters: event, attendee

    try {
        // If both `event` and `attendee` are not provided, get all tasks
        if (!event && !attendee) {
            const tasks = await Task.find(); // Get all tasks
            return res.status(200).json(tasks);
        }

        // If `event` is provided, get tasks for that specific event
        if (event) {
            const tasks = await Task.find({ event: event });  // Find tasks by event ID
            return res.status(200).json(tasks);
        }

        // If `attendee` is provided, get tasks assigned to that specific attendee
        if (attendee) {
            const tasks = await Task.find({ assignedAttendees: attendee });  // Find tasks assigned to attendee ID
            return res.status(200).json(tasks);
        }

    } catch (error) {
        // Error handling
        res.status(400).json({ error: error.message });
    }
};

module.exports = getTasks;
