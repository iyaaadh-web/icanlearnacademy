const express = require('express');
const cors = require('cors');
const { getDb } = require('./src/routes/database');
const routes = require('./src/routes/index'); // API Router
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
app.use('/api', routes);

// Health check
app.get('/', (req, res) => {
    res.send({ message: 'I Can Learn Academy API is running' });
});

// For local development
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
