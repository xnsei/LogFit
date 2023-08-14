import connectDB from "./utils/dbConnection";
import dotenv from "dotenv";

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const workout = require("./models/workout");
const exercise = require("./models/exercise");
const weight = require("./models/weight");
const user = require("./models/user");
const exerciseEntry = require("./models/entry");
const wrapAssync = require("./utils/wrapAssync");

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

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

  socket.on("addWeight", (data: any) => {
    io.emit("updateWeight", data);
  });

  socket.on("deleteWeight", (data: any) => {
    io.emit("updateWeight", data);
  });

  socket.on("addEntry", (data: any) => {
    io.emit("updateEntry", data);
  });

  socket.on("deleteEntry", (data: any) => {
    io.emit("updateEntry", data);
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

app.post(
  "/workouts/:id/exercises",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const { name } = req.body;
    const newExercise = await new exercise({
      name,
    }).save();
    const requestedWorkout = await workout.findByIdAndUpdate(id, {
      $push: { exercises: newExercise._id },
    });
    res.json({ message: "Exercise added to workout successfully!" });
  })
);

app.get(
  "/workouts/:id/exercises",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const requestedWorkout = await workout.findById(id).populate("exercises");
    const exercises = await requestedWorkout.exercises;
    res.send(exercises);
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
    const workoutsToUpdate = await workout.find({ exercises: id });
    const workoutsUpdated = await workoutsToUpdate.map(
      async (tempWorkout: any) => {
        await workout.findByIdAndUpdate(tempWorkout._id, {
          $pull: { exercises: id },
        });
      }
    );
    await exerciseEntry.deleteMany({ exerciseId: id });
    const deletedExercise = await exercise.findByIdAndDelete(id);
    res.json({ message: "Exercise Deleted Successfully" });
  })
);

app.get(
  "/weights",
  wrapAssync(async (req: any, res: any) => {
    const weights = await weight.find({});
    res.send(weights);
  })
);

app.post(
  "/weights/new",
  wrapAssync(async (req: any, res: any) => {
    const { entry, datadate } = req.body;
    const newWeight = await weight.findOneAndUpdate(
      { datadate: datadate },
      { entry: entry },
      { upsert: true }
    );
    res.json({ message: "Weight Saved SuccessFully!!" });
  })
);

app.post(
  "/weights/:id/delete",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const deletedWeight = await weight.findByIdAndDelete(id);
    res.json({ message: "Weight Deleted Successfully" });
  })
);

app.get(
  "/exercises/:id/entries",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const entries = await exerciseEntry.find({ exerciseId: id });
    res.send(entries);
  })
);

app.post(
  "/exercises/:id/entries/new",
  wrapAssync(async (req: any, res: any) => {
    const { id } = req.params;
    const { reps, datadate } = req.body;
    const newEntry = await new exerciseEntry({
      entry: reps,
      datadate: datadate,
      exerciseId: id,
    }).save();
    res.json({ message: "Entry Saved SuccessFully!!" });
  })
);

app.post(
  "/exercises/:exerciseId/entries/:entryId/delete",
  wrapAssync(async (req: any, res: any) => {
    const { exerciseId, entryId } = req.params;
    const deleteEntry = await exerciseEntry.findByIdAndDelete(entryId);
    res.json({ message: "Entry Deleted Successfully" });
  })
);

app.post(
  "/users/new",
  wrapAssync(async (req: any, res: any) => {
    const { username, email, password } = req.body;
    const newUser = await new user({
      username: username,
      email: email,
      password: password,
    }).save();
    const secret = process.env.SECRET;
    console.log(newUser._id, secret);
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      secret
    );
    res.json({ token });
  })
);

const handleUserDeletion = async (userId: string) => {
  // deleting workouts
  await workout.deleteMany({ userId: userId });

  // deleting exercises
  await exercise.deleteMany({ userId: userId });

  // deleting all the entries
  await exerciseEntry.deleteMany({ userId: userId });
};

app.post(
  "/users/delete",
  wrapAssync(async (req: any, res: any) => {
    const token = req.headers.token;
    const secret = process.env.SECRET;
    const decodedUser = jwt.verify(token, secret);
    const userId = decodedUser.userId;
    handleUserDeletion(userId);
    const foundUser = await user.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  })
);

app.post(
  "/users/update",
  wrapAssync(async (req: any, res: any) => {
    const token = req.headers.token;
    const secret = process.env.SECRET;
    const decodedUser = jwt.verify(token, secret);
    const userId = decodedUser.userId;
    const { username, email, password } = req.body;
    const updatedUser = await user.findByIdAndUpdate(userId, {
      username: username,
      email: email,
      password: password,
    });
    res.json({ message: "user updated successfully" });
  })
);

app.post(
  "/users/login",
  wrapAssync(async (req: any, res: any) => {
    const { email, password } = req.body;
    const requestedUser = await user.findOne({
      email: email,
      password: password,
    });
    if (!requestedUser) {
      return res.json({ message: "Please enter valid credentials" });
    } else {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          userId: requestedUser._id,
        },
        secret
      );
      return res.json({ messaeg: "Logged in successfully!", token: token });
    }
  })
);

app.get("/", (req: any, res: any) => {
  res.json({ message: "Hello World!!!" });
});

httpServer.listen(8000, () => {
  console.log("server is running on port: 8000");
});
