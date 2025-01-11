const Task = require('../../models/Task');

const updateTask = async (req, res) => {
    const {id} = req.params;  // Get the task ID from the URL parameters
    const { name, deadline, status, assignedAttendees } = req.body;

    // Validate the status field
    if (status && !['pending', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Status must be either "pending" or "completed"' });
    }

    try {
        // Find the task by ID
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update task fields (only modify provided fields)
        if (name) task.name = name;
        if (deadline) task.deadline = deadline;
        if (status) task.status = status;
        if (assignedAttendees && assignedAttendees.length > 0) {
            task.assignedAttendees = assignedAttendees;
        }

        // Save the updated task
        const updatedTask = await task.save();

        // Respond with the updated task
        res.status(200).json(updatedTask);
    } catch (error) {
        // Error handling
        res.status(400).json({ error: error.message });
    }
};

module.exports = updateTask;
