const Event = require('../../models/Event');

const deleteEvent = async (req, res) => {
  const { id } = req.params; // Get the event ID from the URL
  
  try {
    // Find and delete the event by ID
    const event = await Event.findByIdAndDelete(id);
    
    // If the event is not found, return a 404 error
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    
    // Return success message after deletion
    res.status(200).send({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);  // Log the error for debugging
    res.status(500).send({ message: 'Error deleting event', error: error.message });
  }
};

module.exports = deleteEvent;
