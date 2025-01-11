const User = require('../../models/Usermodel');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const findUser = await User.findOne({ username });
    if (findUser) {
        return res.status(400).json({ message: 'Username already exists'});
    };

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword
        })
        await user.save();
        return res.status(201).json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = register;