const mongoose = require("mongoose");
const { Schema } = mongoose;

const MarketSchema = new Schema({
  market_name: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  debt: {
    type: Number,
    default: 0,
    min: 0,
  },
  employerId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Market", MarketSchema);
