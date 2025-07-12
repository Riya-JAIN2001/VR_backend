const axios = require('axios');
const cron = require('node-cron');
const Coin = require('../model/Coin');
const History = require('../model/History');

const fetchCryptoData = async () => {
  try {
    console.log('Starting cron job...');

   
    const existingCoins = await Coin.find();

    if (existingCoins.length > 0) {
      console.log(`Found ${existingCoins.length} coins in DB. Saving to History...`);

      // Prepare history data
      const historyData = existingCoins.map((coin) => ({
        coinId: coin.coinId,
        name: coin.name,
        image: coin.image,
        price: coin.price,
        marketCap: coin.marketCap,
        change24h: coin.change24h,
        lastUpdated: coin.lastUpdated,
        snapshotTime: new Date(),
      }));

      // Insert into History collection
      await History.insertMany(historyData);
      console.log('History data inserted successfully.');
    } else {
      console.log('No coins found in DB. Skipping history save.');
    }
    const { data: apiData } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
        },
      }
    );

    console.log(`Fetched ${apiData.length} coins from CoinGecko API.`);

    for (const coin of apiData) {
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

    console.log('Cron job completed successfully!');
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
};

// Run every hour
cron.schedule('*/30 * * * *', () => {
  console.log('Running hourly cron job...');
  fetchCryptoData();
});

module.exports = fetchCryptoData;
