const Attendee = require('../../models/Attendee');

const deleteAttendee = async (req, res) => {
    const { id } = req.params;  // Expecting attendee ID in the URL params (e.g., /attendees/:attendeeId)
    try {
        // Find and delete the attendee by ID
        const attendee = await Attendee.findByIdAndDelete(id);

        // If no attendee found with the provided ID
        if (!attendee) {
            return res.status(404).json({ error: 'Attendee not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Attendee deleted successfully' });
    } catch (error) {
        // Error handling for invalid ObjectId or other errors
        res.status(400).json({ error: error.message });
    }
}

module.exports = deleteAttendee;
