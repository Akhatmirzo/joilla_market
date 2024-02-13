const mongoose = require("mongoose");
const { Schema } = mongoose;

const balanceHistorySchema = new Schema(
  {
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    employerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BalanceHistory = mongoose.model("BalanceHistory", balanceHistorySchema);

module.exports = BalanceHistory;
