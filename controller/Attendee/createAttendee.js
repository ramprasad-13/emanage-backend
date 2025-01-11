const Attendee = require('../../models/Attendee');

const createAttendee = async (req, res) => {
    const { name, email } = req.body;

    // Input validation: Check if name and email are provided
    if (!name || !email) {
        return res.status(400).json({ error: 'You must provide a name and email' });
    }

    try {
        // Check if an attendee with the same email already exists
        const existingAttendee = await Attendee.findOne({ email });
        if (existingAttendee) {
            return res.status(400).json({ error: 'An attendee with this email already exists' });
        }

        // Create the new attendee object with the name and email provided
        const attendee = new Attendee({ name, email });

        // Save the new attendee to the database
        await attendee.save();

        // Return the created attendee object in the response
        res.status(201).json(attendee);

    } catch (error) {
        // Error handling: catch any errors that occur during the process
        res.status(400).json({ error: error.message });
    }
}

module.exports = createAttendee;
