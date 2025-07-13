const express = require('express');
const cors = require('cors');
const coinRoutes = require('./routes/coinRoute');
const historyRoutes = require('./routes/historyRoute');

const app = express();

app.use(
  cors({
    origin: "https://vr-automation-frontend-riya.vercel.app"
  })
);
app.use(express.json());

app.use('/api/coins', coinRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Crypto Tracker API running...');
});

module.exports = app;
