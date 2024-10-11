const axios = require('axios');
const CryptoData = require('../models/CryptoData');
const cron = require('node-cron');
const dotenv = require('dotenv');

dotenv.config();

const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  const url = `${process.env.COINGECKO_API_URL}/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${process.env.COINGECKO_API_KEY}`
      }
    });
    const data = response.data;

    for (const coin of coins) {
      const cryptoData = new CryptoData({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change
      });
      await cryptoData.save();
      // console.log(`Fetched data for ${coin}:`, cryptoData);
    }
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

// Schedule the job to run every 30 seconds
cron.schedule('0 */2 * * *', fetchCryptoData);

module.exports = fetchCryptoData;