const express = require("express");
const router = express.Router();
const {getCryptoLatestData} = require("../controllers/cryptoController");

router.get("/stats", getCryptoLatestData);

module.exports = router;