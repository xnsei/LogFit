import express from "express";
const workoutRouter = express.Router();
const workout = require("./../models/workout");
const wrapAssync = require("./../utils/wrapAssync");

workoutRouter.get(
  "/",
  wrapAssync(async (req: any, res: any) => {
    const workouts = await workout.find({});
    res.send(workouts);
  })
);

workoutRouter.post(
  "/new",
  wrapAssync(async (req: any, res: any) => {
    const { name } = req.body;
    const newWorkout = new workout({
      name,
    });
    await newWorkout.save();
    res.json({ message: "Workout Saved SuccessFully!!" });
  })
);

workoutRouter.get(
  "/:id",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const requestedWorkout = await workout.findById(id);
    res.json(requestedWorkout);
  })
);

module.exports = workoutRouter;
