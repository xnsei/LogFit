import mongoose from "mongoose";

const weightSchema = new mongoose.Schema({
    entry: {
        type: Number,
        required: true,
    },
    datadate: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Weight = mongoose.model("Weight", weightSchema);

module.exports = Weight;
