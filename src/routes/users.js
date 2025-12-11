const express = require('express');
const { getDb } = require('./database');
const { verifyToken, verifyAdmin } = require('../../middleware/auth');

const router = express.Router();

// GET all users (Admin only)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
    const db = await getDb();
    try {
        const users = await db.all('SELECT id, name, email, role, created_at FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = router;
