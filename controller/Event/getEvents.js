const Event = require('../../models/Event');

const getEvents = async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.find(); 

    // Return the list of events with a 200 status
    res.status(200).send(events);
  } catch (error) {
    console.error('Error fetching events:', error);  // Log the error for debugging
    res.status(500).send({ message: 'Error fetching events', error: error.message });
  }
};

module.exports = getEvents;
