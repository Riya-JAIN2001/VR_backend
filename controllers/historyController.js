const Coin = require('../model/Coin');
const History = require('../model/History');

const saveHistory = async (req, res) => {
  try {
    const coins = await Coin.find();
    const historyDocs = coins.map(c => ({
      coinId: c.coinId,
      name: c.name,
      image: c.image,
      price: c.price,
      marketCap: c.marketCap,
      change24h: c.change24h,
      lastUpdated: c.lastUpdated
    }));

    await History.insertMany(historyDocs);

    res.json({ message: 'History saved!', data: coins});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCoinHistory = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await History.find({ coinId }).sort({ createdAt: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { saveHistory, getCoinHistory };
