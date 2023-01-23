const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({"message": "email and password are required"});
    }

    const user = await User.findOne({email: email}).exec();
    
    if(!user) {
        return res.status(401).json({"message": "user does not exist"});
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        return res.status(401).json({"message": "password is not correct"}); 
    } else {

        const accessToken = jwt.sign(
            {"email": user.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '900s'}
        );

        const refreshToken = jwt.sign(
            {"email": user.email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        user.refreshToken = refreshToken;
        const result = await user.save();

        res.cookie("refreshToken", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        
        res.json({"accessToken": accessToken});
    }
};

module.exports = { login };