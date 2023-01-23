const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', "https://read-it-later-56c51.web.app");
    }
    next();
}

module.exports = credentials;