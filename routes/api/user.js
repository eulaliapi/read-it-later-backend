const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const itemController = require('../../controllers/itemController');

router.route('/').get(userController.getUser);

router.route('/:userId').post(itemController.createItem);
router.route('/:userId/:itemId').delete(itemController.deleteItem);

module.exports = router;