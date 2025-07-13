const axios = require('axios');
const Coin = require('../model/Coin');

const getCoins = async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
        },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      }
    );

    console.log(`Fetched ${data.length} coins from CoinGecko.`);


    for (const coin of data) {
      await Coin.findOneAndUpdate(
        { coinId: coin.id },
        {
          coinId: coin.id,
          name: coin.name,
          image: coin.image,
          price: coin.current_price,
          marketCap: coin.market_cap,
          change24h: coin.price_change_percentage_24h,
          lastUpdated: coin.last_updated,
        },
        { upsert: true, new: true }
      );
    }

    console.log('Coin collection updated.');

   
    res.json(data);

  } catch (err) {
    console.error('Error fetching coins:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCoins };

