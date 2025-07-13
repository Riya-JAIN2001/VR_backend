const axios = require('axios');
const cron = require('node-cron');
const History = require('../model/History');

const fetchCryptoData = async () => {
  try {
    console.log('Starting cron job...');

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

    console.log(`Fetched ${apiData.length} coins from CoinGecko.`);
    const historyData = apiData.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      image: coin.image,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      lastUpdated: coin.last_updated,
      snapshotTime: new Date(),
    }));

    await History.insertMany(historyData);
    console.log('History data inserted successfully.');

    console.log('Cron job completed!');
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
};

cron.schedule('*/30 * * * *', () => {
  console.log('Running cron job every 30 minutes...');
  fetchCryptoData();
});

module.exports = fetchCryptoData;
