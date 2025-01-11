const express = require('express');
const router = express.Router();

//Event Routes
const getEvents = require('./controller/Event/getEvents');
const createEvent = require('./controller/Event/createEvent');
const updateEvent = require('./controller/Event/updateEvent');
const deleteEvent = require('./controller/Event/deleteEvent');

router.get('/events',getEvents);
router.post('/events',createEvent);
router.put('/events/:id',updateEvent);
router.delete('/events/:id',deleteEvent);


//Attendee Routes
const getAttendees = require('./controller/Attendee/getAttendees');
const createAttendee = require('./controller/Attendee/createAttendee');
const deleteAttendee = require('./controller/Attendee/deleteAttendee');

router.get('/attendees',getAttendees);
router.post('/attendees',createAttendee);
router.delete('/attendees/:id',deleteAttendee);

//Task Routes
const getTasks = require('./controller/Task/getTasks');
const createTask = require('./controller/Task/createTask');
const updateTask = require('./controller/Task/updateTask');

router.get('/tasks',getTasks);
router.post('/tasks',createTask);
router.put('/tasks/:id',updateTask);

module.exports = router;