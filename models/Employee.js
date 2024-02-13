const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  employer_id: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
  debt: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
