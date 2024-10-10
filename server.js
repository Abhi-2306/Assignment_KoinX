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
    res.send("Server is running");
});
cron.schedule("0 */2 * * *", async () => {
    await fetchAndSaveCryptoData();
    console.log("Data fetched and saved");
})
app.use("/api", cryptoRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});