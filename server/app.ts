import connectDB from "./dbConnection";

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const workout = require("./models/workout");
const exercise = require("./models/exercise");
const wrapAssync = require("./utils/wrapAssync");

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log("User Connected: " + socket.id);

  socket.on("addWorkout", (data: any) => {
    io.emit("updateWorkout", data);
  });

  socket.on("deleteWorkout", (data: any) => {
    io.emit("updateWorkout", data);
  });

  socket.on("addExercise", (data: any) => {
    io.emit("updateExercise", data);
  });

  socket.on("deleteExercise", (data: any) => {
    io.emit("updateExercise", data);
  });
});

connectDB();

app.get(
  "/workouts",
  wrapAssync(async (req: any, res: any) => {
    const workouts = await workout.find({});
    res.send(workouts);
  })
);

app.post(
  "/workouts/new",
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
  "/workouts/:id",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const requestedWorkout = await workout.findById(id);
    res.send(requestedWorkout);
  })
);

app.post(
  "/workouts/:id/delete",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const deletedWorkout = await workout.findByIdAndDelete(id);
    res.json({ message: "Workout Deleted Successfully" });
  })
);

app.get(
  "/exercises",
  wrapAssync(async (req: any, res: any) => {
    const exercises = await exercise.find({});
    res.send(exercises);
  })
);

app.post(
  "/exercises/new",
  wrapAssync(async (req: any, res: any) => {
    const { name } = req.body;
    const newExercise = new exercise({
      name,
    });
    await newExercise.save();
    res.json({ message: "Exercise Saved SuccessFully!!" });
  })
);

app.post(
  "/exercises/:id/delete",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const deletedExercise = await exercise.findByIdAndDelete(id);
    res.json({ message: "Exercise Deleted Successfully" });
  })
);

app.get("/", (req: any, res: any) => {
  res.json({ message: "Hello World!!!" });
});

httpServer.listen(8000, () => {
  console.log("server is running on port: 8000");
});
