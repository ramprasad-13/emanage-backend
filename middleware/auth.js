const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel');

const auth = async (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(400).send({ error: 'Token is required' });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        // Find the user associated with the decoded token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Attach the token and user data to the request object
        req.token = token;
        req.user = { id: user._id, username: user.username };

        // Proceed to the next middleware or route handler
        next();
    } catch (e) {
        // Handle specific JWT errors and general errors
        if (e.name === 'JsonWebTokenError') {
            return res.status(401).send({ error: 'Invalid or malformed token' });
        } else if (e.name === 'TokenExpiredError') {
            return res.status(401).send({ error: 'Token expired' });
        }
        return res.status(500).send({ error: 'Server error' });
    }
};

module.exports = auth;
