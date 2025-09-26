const mongoose = require('mongoose');

// "Аниме паспортының" үлгісі
const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Бұл жол міндетті
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    score: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now // Автоматты түрде қосылған уақытты белгілейді
    }
});

// Осы сызбаны басқа файлдарда қолдану үшін экспорттаймыз
module.exports = mongoose.model('Anime', animeSchema);
