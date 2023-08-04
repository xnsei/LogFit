import connectDB from "./dbConnection";

const express = require("express");
const cors = require("cors");
const app = express();
const workout = require("./models/workout");
const wrapAssync = require("./utils/wrapAssync");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get(
  "/",
  wrapAssync(async (req: any, res: any) => {
    const workouts = await workout.find({});
    res.send(workouts);
  })
);

app.post(
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

app.get(
  "/:id",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const requestedWorkout = await workout.findById(id);
    res.json(requestedWorkout);
  })
);

app.get("/", (req: any, res: any) => {
  res.json({ message: "Hello World!!!" });
});

app.listen(8000, () => {
  console.log("server is running on port: 8000");
});
