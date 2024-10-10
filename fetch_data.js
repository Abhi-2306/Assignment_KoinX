const axios = require('axios');

const baseUrl = "https://api.coingecko.com/api/v3/simple/price";
const ids = ["bitcoin","ethereum","matic-network"]

exports.getData = async () => {
    try {
        const response = await axios.get(baseUrl, {
            params:{
                ids: ids.join(","),
                vs_currencies: "usd",
                include_market_cap: true,
                include_24hr_change: true,
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
