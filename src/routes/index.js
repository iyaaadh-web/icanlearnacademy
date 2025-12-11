const express = require('express');
const authRoutes = require('./auth');
const courseRoutes = require('./courses');

const usersRoutes = require('./users');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/', courseRoutes); // courses.js generally has /courses, /enroll etc.

module.exports = router;
