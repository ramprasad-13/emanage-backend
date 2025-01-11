const Event = require('../../models/Event');

const createEvent = async (req, res) => {
  const { name, description, location, date } = req.body;

  // Validate if all required fields are provided
  if (!name || !description || !location || !date) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  // Convert and validate the date
  const updatedDate = new Date(date);
  if (isNaN(updatedDate)) {
    return res.status(400).send({ message: 'Invalid date format' });
  }

  try {
    // Check if an event with the same name already exists
    const existingEvent = await Event.findOne({ name });
    if (existingEvent) {
      return res.status(400).send({ message: 'Event with this name already exists' });
    }

    // Create a new event
    const event = new Event({
      name,
      description,
      location,
      date: updatedDate,
    });

    // Save the event to the database
    await event.save();

    // Return the created event
    res.status(201).send(event);

  } catch (error) {
    console.error("Error while creating event:", error);  // Log the error for debugging
    res.status(500).send({ message: 'Error creating event', error: error.message });
  }
};

module.exports = createEvent;
