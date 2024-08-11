const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Username = require('./models/username');
const getSuffix = require('./utils/suffixes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/usernameDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to the database');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { username: null });
});

app.post('/add', async (req, res) => {
    const original = req.body.username;
    const modified = getSuffix(original);

    // Save the original and modified username to the database
    const newUsername = new Username({ original, modified });
    await newUsername.save();

    // Render only the current result on the page
    res.render('index', { username: { original, modified } });
});

app.get('/history', async (req, res) => {
    // Fetch all generated usernames from the database
    const allUsernames = await Username.find();
    res.render('history', { allUsernames });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
