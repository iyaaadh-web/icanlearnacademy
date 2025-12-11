const express = require('express');
const { getDb } = require('./database');
const { verifyToken, verifyAdmin } = require('../../middleware/auth');

const router = express.Router();

// GET all courses (Public)
router.get('/courses', async (req, res) => {
    const db = await getDb();
    try {
        const courses = await db.all('SELECT * FROM courses');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

// GET my courses (Protected)
router.get('/my-courses', verifyToken, async (req, res) => {
    const db = await getDb();
    try {
        const courses = await db.all(
            `SELECT c.* FROM courses c
       JOIN enrollments e ON c.id = e.course_id
       WHERE e.user_id = ?`,
            [req.user.userId]
        );
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch your courses' });
    }
});

// POST enroll in a course (Protected)
router.post('/enroll', verifyToken, async (req, res) => {
    const { courseId } = req.body;
    const db = await getDb();

    try {
        await db.run(
            'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
            [req.user.userId, courseId]
        );
        res.status(201).json({ message: 'Enrolled successfully' });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Already enrolled in this course' });
        }
        res.status(500).json({ error: 'Failed to enroll' });
    }
});

// --- ADMIN ROUTES ---

// CREATE a new course (Admin only)
router.post('/courses', verifyToken, verifyAdmin, async (req, res) => {
    const { title, description, instructor, price, image_url } = req.body;

    if (!title || !instructor || !price) {
        return res.status(400).json({ error: 'Title, Instructor, and Price are required' });
    }

    const db = await getDb();
    try {
        const result = await db.run(
            'INSERT INTO courses (title, description, instructor, price, image_url) VALUES (?, ?, ?, ?, ?)',
            [title, description, instructor, price, image_url]
        );
        res.status(201).json({ id: result.lastID, title, description, instructor, price, image_url });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create course' });
    }
});

// UPDATE a course (Admin only)
router.put('/courses/:id', verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { title, description, instructor, price, image_url } = req.body;
    const db = await getDb();

    try {
        await db.run(
            'UPDATE courses SET title = ?, description = ?, instructor = ?, price = ?, image_url = ? WHERE id = ?',
            [title, description, instructor, price, image_url, id]
        );
        res.json({ message: 'Course updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update course' });
    }
});

// DELETE a course (Admin only)
router.delete('/courses/:id', verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const db = await getDb();

    try {
        await db.run('DELETE FROM courses WHERE id = ?', [id]);
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete course' });
    }
});

module.exports = router;
