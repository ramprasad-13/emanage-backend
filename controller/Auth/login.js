const User = require('../../models/Usermodel');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({message:'Username and password are required'});
    }
    const findUser = await User.findOne({username});
    if(!findUser){
        return res.status(400).json({message:'Username does not exist'});
    }
    const comparePassword = await bcrypt.compare(password,findUser.password);
    if(!comparePassword){
        return res.status(400).json({message:'Password is incorrect'});
    }
    const token = jwt.sign({id:findUser._id,username:findUser.username},process.env.JWT_SECRET,{expiresIn:'1h'});
    return res.status(200).json({token});
}

module.exports = login;