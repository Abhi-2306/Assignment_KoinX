const { mongoose } = require("mongoose");


const cryptoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        enum: ["bitcoin", "ethereum", "matic-network"]
    },
    price: {
        type: Number,
        required: true
    },
    market_cap: {
        type: Number,
        required: true
    },
    change_24hr: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Crypto", cryptoSchema);