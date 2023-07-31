import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
