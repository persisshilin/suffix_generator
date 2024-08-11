const mongoose = require('mongoose');

const usernameSchema = new mongoose.Schema({
    original: String,
    modified: String,
});

const Username = mongoose.model('Username', usernameSchema);

module.exports = Username;
