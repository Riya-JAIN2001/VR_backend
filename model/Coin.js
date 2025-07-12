const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema({
  coinId: { type: String, required: true, unique: true },
  name: String,
  image: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  lastUpdated: Date,
});

module.exports = mongoose.model('Coin', CoinSchema);
