const { getData } = require("../fetch_data");
const crypto = require("../models/crypto");

exports.getStandardDeviation = async (req, res) => {
    try {
        const { coin } = req.query;
        if (!coin || !["bitcoin", "ethereum", "matic-network"].includes(coin)) {
            return res.status(400).send("Invalid coin");
        }
        const data = await crypto.find({ name: coin }).sort({ createdAt: -1 }).limit(100);

        if (data.length === 0) {
            res.status(404).json({ message: "Data not found for this coin" });
        }

        const prices = data.map(item => item.price);
        const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
        const squared = prices.map((price) => (price - mean) ** 2);
        const variance = squared.reduce((a, b) => a + b, 0) / prices.length;
        const deviation = Math.sqrt(variance);
        res.status(200).json({ deviation });
    } catch (error) {
        res.status(500).send("Error fetching deviation");
    }
}
exports.getCryptoLatestData = async (req, res) => {
    try {
        const { coin } = req.query;
        if (!coin || !["bitcoin", "ethereum", "matic-network"].includes(coin)) {
            return res.status(400).send("Invalid coin");
        }
        const latest = await crypto.findOne({ name: coin }).sort({ createdAt: -1 });
        if (!latest) {
            res.status(404).json({ message: "Data not found" });
        }
        res.status(200).json({
            name: latest.name,
            price: latest.price,
            market_cap: latest.market_cap,
            change_24hr: latest.change_24hr
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error occurred while fetching the latest data");
    }
}

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