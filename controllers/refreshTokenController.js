const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    
    if(!cookies?.refreshToken) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({refreshToken}).exec();

    if(!user) {
        return res.sendStatus(403);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || user.email !== decoded.email) {
                return res.sendStatus(403)
            }
            const accessToken = jwt.sign(
                {"email": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '900s'}
            );
            res.json({accessToken});
        }
    )
};

module.exports = { handleRefreshToken };