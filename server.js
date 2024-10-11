const express = require("express");
const app = express();
const { getData } = require("./fetch_data");
const cron = require('node-cron');
const cryptoRoutes = require("./routes/cryptoRoutes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { fetchAndSaveCryptoData } = require("./controllers/cryptoController");
dotenv.config();

connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.get("/", async (req, res) => {
    res.send("Server is running <br> Add the following in the URL:<br> /api/stats?coin=(bitcoin or ethereum or matic-network) to get latest stats<br> /api/deviation?coin=(bitcoin or ethereum or matic-network) to get deviation stats");
});
cron.schedule("*/1 * * * *", async () => {
    await fetchAndSaveCryptoData();
    console.log("Data fetched and saved");
})
app.use("/api", cryptoRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

