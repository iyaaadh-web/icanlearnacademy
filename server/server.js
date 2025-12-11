const express = require('express');
const cors = require('cors');
const { getDb } = require('./database');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DB
getDb().then(() => {
    console.log('Database initialized');
}).catch(err => {
    console.error('Failed to initialize database', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', courseRoutes);

// Health check
app.get('/', (req, res) => {
    res.send({ message: 'I Can Learn Academy API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
