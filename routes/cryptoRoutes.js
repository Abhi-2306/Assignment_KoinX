const express = require("express");
const router = express.Router();
const {getCryptoLatestData, getStandardDeviation} = require("../controllers/cryptoController");

router.get("/stats", getCryptoLatestData);
router.get("/deviation",getStandardDeviation);

module.exports = router;