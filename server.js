const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CryptoData = require('./models/CryptoData');
const fetchCryptoData = require('./jobs/fetchCryptoData');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

app.get('/stats', async (req, res) => {
  const { coin } = req.query;
  const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
  if (!latestData) {
    return res.status(404).json({ error: 'Data not found' });
  }
  res.json({
    price: latestData.price,
    marketCap: latestData.marketCap,
    '24hChange': latestData.change24h
  });
});

app.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  const data = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
  if (data.length === 0) {
    return res.status(404).json({ error: 'Data not found' });
  }
  const prices = data.map(d => d.price);
  console.log(prices);  
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
  const deviation = Math.sqrt(variance);
  res.json({ deviation });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  fetchCryptoData(); // Initial fetch
});