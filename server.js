require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const fetchCryptoData = require('./crons/fetchCryptoData');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  fetchCryptoData(); // Initial fetch

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
