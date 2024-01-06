import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
        required: true,
    },
    exercises: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Exercise", default: []},
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
