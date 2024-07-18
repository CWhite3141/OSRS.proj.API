const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Modules
const Items = require('./components/Items'); // Updated path based on your project structure

// Initialize dotenv to use environment variables
dotenv.config();

// Environment variables
const port = process.env.PORT || 3000;

// Components
const app = express();
const items = new Items();

// Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Enable CORS for all routes
app.use(cors());

// Routes
app.get('/api', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/ge', items.app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});