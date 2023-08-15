import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  entry: {
    type: Number,
    required: true,
  },
  datadate: {
    type: String,
    required: true,
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
