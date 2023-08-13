import mongoose from "mongoose";

const weightSchema = new mongoose.Schema({
  entry: {
    type: Number,
    required: true,
  },
  datadate: {
    type: String,
    required: true,
    unique: true,
  },
});

const Weight = mongoose.model("Weight", weightSchema);

module.exports = Weight;
