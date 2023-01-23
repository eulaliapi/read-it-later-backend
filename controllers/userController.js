const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUser = async (req, res) => {

    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    const email = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) {
                return res.sendStatus(403);
            }
            req.user = decoded.email;
            return decoded.email;
        }
    )
    
    const user = await User.findOne({email: email}).exec();

    if(!user) {
        res.sendStatus(403)
    }

    res.send(user);
};

module.exports = { getUser };