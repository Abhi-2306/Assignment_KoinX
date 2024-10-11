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
app.post("/api/fetchData", async (req, res) => {
    try {
        await fetchAndSaveCryptoData();
        console.log("Data fetched and saved");
        return res.status(200).json({ message: "Data fetched and saved successfully." });
    } catch (error) {
        console.error("Error fetching and saving data:", error);
        return res.status(500).json({ message: "Error fetching data." });
    }
});
app.use("/api", cryptoRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

