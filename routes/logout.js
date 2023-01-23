const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

router.route('/').get(logoutController.logout);

module.exports = router;