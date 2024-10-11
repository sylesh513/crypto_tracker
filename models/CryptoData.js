const mongoose = require('mongoose');

const cryptoDataSchema = new mongoose.Schema({
  coin: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CryptoData', cryptoDataSchema);