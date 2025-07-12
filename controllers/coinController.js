const Coin = require('../model/Coin');

const getCoins = async (req, res) => {
  try {
    const coins = await Coin.find();
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCoins };
