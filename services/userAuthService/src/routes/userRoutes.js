const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middleware');



// Register route with validation
router.post('/:userId',userController.getUserData);

module.exports = router;