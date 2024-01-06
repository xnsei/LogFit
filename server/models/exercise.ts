import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCardio: {
        type: Boolean,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
