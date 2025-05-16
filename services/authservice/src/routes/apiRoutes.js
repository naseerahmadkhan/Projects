const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const passwordRoutes = require('./passwordRoutes');
const userRoutes = require('./userRoutes');

// Mount all the sub-routes
router.use('/auth', authRoutes);
router.use('/password', passwordRoutes);
router.use('/users', userRoutes);

module.exports = router;
