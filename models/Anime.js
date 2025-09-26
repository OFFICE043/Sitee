const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number },
    score: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Anime', animeSchema);
