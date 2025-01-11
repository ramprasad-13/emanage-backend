const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const auth = require('./middleware/auth');

// Connect to MongoDB
const connectDb = require('./connection');
connectDb();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - Allow requests from the given frontend URL
const corsOptions = {
  origin: process.env.FRONTEND_URL, // This is the URL you want to allow
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // You can specify the allowed HTTP methods
  credentials: true, // Optional, if your frontend needs to send cookies
};

app.use(cors(corsOptions));

// Routes
const authRoutes = require('./authRoutes');
app.use('/api', authRoutes);

const routes = require('./routes');
app.use('/api', auth, routes);

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});

module.exports = app;
