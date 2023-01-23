const User = require('../models/User'); 

const logout = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.refreshToken) {
        return res.sendStatus(204);
    }

    const refreshToken = cookies.refreshToken;

    const user = await User.findOne({refreshToken}).exec();

    if(!user) {
        res.clearCookie("refreshToken", {httpOnly: true, sameSite: "None", secure: true});
        return res.sendStatus(204);
    }   

    user.refreshToken = "";
    await user.save();
    res.clearCookie("refreshToken", {httpOnly: true, sameSite: "None", secure: true});
    return res.sendStatus(204);

};

module.exports = { logout };