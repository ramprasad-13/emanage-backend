const Event = require('../../models/Event');

const updateEvent = async (req, res) => {
  const { id } = req.params; // Get the event ID from the URL
  const { name, description, location, date } = req.body; // Get the updated event data from the request body

  // Validate required fields
  if (!name || !description || !location || !date) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  // Validate the date
  const updatedDate = new Date(date);
  if (isNaN(updatedDate)) {
    return res.status(400).send({ message: 'Invalid date format' });
  }

  // Check if an event with the same name already exists (excluding the current event)
  try {
    const existingEvent = await Event.findOne({ name, _id: { $ne: id } });
    if (existingEvent) {
      return res.status(400).send({ message: 'Event with this name already exists' });
    }

    // Find the event by ID and update it
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }

    // Update the event fields
    event.name = name;
    event.description = description;
    event.location = location;
    event.date = updatedDate;

    // Save the updated event
    await event.save();

    // Return the updated event
    res.status(200).send(event);
  } catch (error) {
    console.error('Error updating event:', error); // Log the error for debugging
    res.status(500).send({ message: 'Error updating event', error: error.message });
  }
};

module.exports = updateEvent;
