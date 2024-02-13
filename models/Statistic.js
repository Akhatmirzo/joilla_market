const mongoose = require("mongoose");
const { Schema } = mongoose;

const statisticSchema = new Schema(
  {
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    employerId: {
      type: String,
      required: true,
    },
    products: {
      type: [
        {
          productId: String,
          name: String,
          code: String,
          soldQty: Number,
          inStoreQty: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Statistic = mongoose.model("Statistic", statisticSchema);

module.exports = Statistic;
