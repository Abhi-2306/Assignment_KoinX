const { getData } = require("../fetch_data");
const crypto = require("../models/crypto");


exports.fetchAndSaveCryptoData = async (req, res) => {
    try {
        const data = await getData();
        const ids = ["bitcoin", "ethereum", "matic-network"];
        for (const id of ids) {
            const cryptoData = data[id];
            if (cryptoData) {
                const newData = new crypto({
                    name: id,
                    price: cryptoData.usd,
                    market_cap: cryptoData.usd_market_cap,
                    change_24hr: cryptoData.usd_24h_change
                });
                await newData.save();
                console.log(`Data saved for ${id}`);
            }
        }
    } catch (error) {
        console.error('Error fetching and saving data:', error);
    }
};