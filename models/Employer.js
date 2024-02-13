const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployerSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  admin_id: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^(\+998)-\d{2}-\d{3}-\d{2}-\d{2}$/.test(value);
      },
      message: "Invalid phone number format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

module.exports = mongoose.model("Employer", EmployerSchema);
