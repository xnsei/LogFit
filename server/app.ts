import connectDB from "./dbConnection";

const express = require("express");
const cors = require("cors");
const workouts = require("./routes/workouts");
const exercises = require("./routes/exercises");

// const workout = require("./models/workout");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/workouts/", workouts);
app.use("/exercises", exercises);

connectDB();

app.get("/", (req: any, res: any) => {
  res.json({ message: "Hello World!!!" });
});

// app.get("/workouts/:id", async (req: any, res: any) => {
//   const { id } = req.params;
//   const requestedWorkout = await workout.findById(id);
//   res.json(requestedWorkout);
// });

app.listen(8000, () => {
  console.log("server is running on port: 8000");
});
