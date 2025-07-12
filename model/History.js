const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  coinId: { type: String, required: true },
  name: String,
  image: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  lastUpdated: Date,
  createdAt: { type: Date, default: Date.now },
  snapshotTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', HistorySchema);
