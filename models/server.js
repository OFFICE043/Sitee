const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Аниме моделін (паспортын) импорттаймыз
const Anime = require('./models/Anime'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- MONGODB ДЕРЕКҚОРЫНА ҚОСЫЛУ ---
const dbUri = process.env.DATABASE_URL;
mongoose.connect(dbUri)
  .then(() => console.log('✅ MongoDB уланди!'))
  .catch((err) => console.error('❌ MongoDB уланишда хатолик:', err));

// --- API ЕРЕЖЕЛЕРІ ---

// Барлық анимелерді базадан алып жіберетін ереже
app.get('/api/animes', async (req, res) => {
  try {
    const animes = await Anime.find().sort({ createdAt: -1 });
    res.json(animes);
  } catch (error) {
    res.status(500).json({ message: "Анимелерді алу кезінде қате кетті" });
  }
});

// Жаңа аниме қосатын ереже
app.post('/api/animes', async (req, res) => {
  const { title, description, imageUrl, year, score } = req.body;
  
  const newAnime = new Anime({
    title,
    description,
    imageUrl,
    year,
    score
  });

  try {
    const savedAnime = await newAnime.save();
    res.status(201).json(savedAnime);
  } catch (error) {
    res.status(400).json({ message: "Аниме қосу кезінде қате кетті" });
  }
});

// --- FRONTEND ФАЙЛДАРЫН КӨРСЕТУ ---
app.use(express.static(__dirname));

// --- СЕРВЕРДІ ІСКЕ ҚОСУ ---
app.listen(PORT, () => {
  console.log(`🚀 Сервер ${PORT} портда ишламоқда.`);
});
