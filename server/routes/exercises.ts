import express from "express";
const exerciseRouter = express.Router();
const exercise = require("./../models/exercise");
const wrapAssync = require("./../utils/wrapAssync");

exerciseRouter.get(
  "/",
  wrapAssync(async (req: any, res: any) => {
    const workouts = await exercise.find({});
    res.send(workouts);
  })
);

exerciseRouter.post(
  "/new",
  wrapAssync(async (req: any, res: any) => {
    const { name } = req.body;
    const newWorkout = new exercise({
      name,
    });
    await newWorkout.save();
    res.json({ message: "Exercise Saved SuccessFully!!" });
  })
);

module.exports = exerciseRouter;
