const Attendee = require('../../models/Attendee');

const getAttendees = async (req, res) => {
    try {
        // Fetch all attendees
        const attendees = await Attendee.find();

        // Respond with the list of attendees
        res.status(200).json(attendees);
    } catch (error) {
        // Handle any errors that might occur during fetching
        res.status(400).json({ error: error.message });
    }
}

module.exports = getAttendees;
