import connectDB from "./utils/dbConnection";
import dotenv from "dotenv";

const express = require("express");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");
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
app.use(express.urlencoded({extended: true}));

dotenv.config();

const io = new Server(httpServer, {
    cors: {
        origin: (process.env.CLIENT_URL || "http://localhost:5173"),
        methods: ["GET", "POST"],
    },
});

connectDB();

const authenticateToken = wrapAssync(async (req: any, res: any, next: any) => {
    const token = req.headers.token;
    const secret = process.env.SECRET;
    try {
        const decodedUser = jwt.verify(token, secret);
        const userId = decodedUser.userId;
        const foundUser = await user.findById(userId);
        if (foundUser) {
            req.user = userId;
            next();
        } else {
            res.status(401);
            return res.json({messaeg: "Logged in successfully!", token: token});
        }
    } catch (error) {
        res.status(401);
        return res.json({message: "Error occured: ", Error: error});
    }
});

app.get(
    "/workouts",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const workouts = await workout.find({userId: userId});
        res.send(workouts);
    })
);

app.post(
    "/workouts/new",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const {name, description} = req.body;
        const userId = req.user;
        const newWorkout = new workout({
            name: name,
            description: description,
            userId: userId,
        });
        await newWorkout.save();
        console.log(newWorkout);
        res.json({message: "Workout Saved SuccessFully!!"});
    })
);

app.get(
    "/workouts/:id",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {id} = req.params;
        const requestedWorkout = await workout.findOne({_id: id, userId: userId});
        res.send(requestedWorkout);
    })
);

app.post(
    "/workouts/:id/delete",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {id} = req.params;
        const workoutToBeDeleted = await workout.findOne({
            _id: id,
            userId: userId,
        });
        if (workoutToBeDeleted) await workout.findByIdAndDelete(id);
        res.json({message: "Workout Deleted Successfully"});
    })
);

app.post(
    "/workouts/:id/exercises/new",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {id} = req.params;
        const requestedWorkout = await workout.findOne({_id: id, userId: userId});
        if (requestedWorkout) {
            const {name, description, isCardio} = req.body;
            const newExercise = await new exercise({
                name: name,
                description: description,
                isCardio: isCardio,
                userId: userId,
            }).save();
            const workoutToBeUpdated = await workout.findByIdAndUpdate(id, {
                $push: {exercises: newExercise._id},
            });
        }
        res.json({message: "Exercise added to workout successfully!"});
    })
);

app.get(
    "/workouts/:id/exercises",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {id} = req.params;

        const requestedWorkout = await workout.findOne({_id: id, userId: userId});
        if (requestedWorkout) {
            const requestedWorkoutWithExercises = await requestedWorkout.populate(
                "exercises"
            );
            const exercises = await requestedWorkoutWithExercises.exercises;
            res.send(exercises);
        }
    })
);

app.get(
    "/exercises",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const exercises = await exercise.find({userId: userId});
        res.send(exercises);
    })
);

app.post(
    "/exercises/:id/delete",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {id} = req.params;
        const workoutsToUpdate = await workout.find({
            exercises: id,
            userId: userId,
        });
        const workoutsUpdated = await workoutsToUpdate.map(
            async (tempWorkout: any) => {
                await workout.findByIdAndUpdate(tempWorkout._id, {
                    $pull: {exercises: id},
                });
            }
        );
        await exerciseEntry.deleteMany({exerciseId: id});
        const deletedExercise = await exercise.findByIdAndDelete(id);
        res.json({message: "Exercise Deleted Successfully"});
    })
);

app.get(
    "/weights",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const weights = await weight.find({userId: userId});
        res.send(weights);
    })
);

app.post(
    "/weights/new",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {entry, datadate} = req.body;
        const newWeight = await weight.findOneAndUpdate(
            {datadate: datadate, userId: userId},
            {entry: entry},
            {upsert: true}
        );
        res.json({message: "Weight Saved SuccessFully!!"});
    })
);

app.post(
    "/weights/:id/delete",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {id} = req.params;
        const weightToBeDeleted = await weight.findOne({userId: userId, _id: id});
        if (weightToBeDeleted) await weight.findByIdAndDelete(id);
        res.json({message: "Weight Deleted Successfully"});
    })
);

app.get(
    "/exercises/:id/entries",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {id} = req.params;
        const entries = await exerciseEntry.find({
            exerciseId: id,
            userId: userId,
        });
        res.send(entries);
    })
);

app.post(
    "/exercises/:id/entries/new",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {id} = req.params;
        const {weight, repetitions, duration, datadate} = req.body;
        const newEntry = await new exerciseEntry({
            weight: weight,
            repetitions: repetitions,
            duration: duration,
            datadate: datadate,
            exerciseId: id,
            userId: userId,
        }).save();
        res.json({message: "Entry Saved SuccessFully!!"});
    })
);

app.post(
    "/exercises/:exerciseId/entries/:entryId/delete",
    authenticateToken,
    wrapAssync(async (req: any, res: any) => {
        const userId = req.user;
        const {exerciseId, entryId} = req.params;
        const entryToBeDeleted = await exerciseEntry.findOne({
            _id: entryId,
            exerciseId: exerciseId,
            userId: userId,
        });
        if (entryToBeDeleted) await exerciseEntry.findByIdAndDelete(entryId);
        res.json({message: "Entry Deleted Successfully"});
    })
);

app.post(
    "/users/new",
    wrapAssync(async (req: any, res: any) => {
        const {username, email, password} = req.body;
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
        res.json({token});
    })
);

const handleUserDeletion = async (userId: string) => {
    // deleting workouts
    await workout.deleteMany({userId: userId});

    // deleting exercises
    await exercise.deleteMany({userId: userId});

    // deleting all the entries
    await exerciseEntry.deleteMany({userId: userId});
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
        res.json({message: "User deleted successfully"});
    })
);

app.post(
    "/users/update",
    wrapAssync(async (req: any, res: any) => {
        const token = req.headers.token;
        const secret = process.env.SECRET;
        const decodedUser = jwt.verify(token, secret);
        const userId = decodedUser.userId;
        const {username, email, password} = req.body;
        const updatedUser = await user.findByIdAndUpdate(userId, {
            username: username,
            email: email,
            password: password,
        });
        res.json({message: "user updated successfully"});
    })
);

app.post(
    "/users/login",
    wrapAssync(async (req: any, res: any) => {
        const {email, password} = req.body;
        const requestedUser = await user.findOne({
            email: email,
            password: password,
        });
        if (!requestedUser) {
            return res.status(401).json({message: "Please enter valid credentials"});
        } else {
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    userId: requestedUser._id,
                },
                secret
            );
            return res.json({message: "Logged in successfully!", token: token});
        }
    })
);

app.get("/authenticate", authenticateToken, (req: any, res: any) => {
    res.json({message: "authenticated"});
});

app.get("/", (req: any, res: any) => {
    res.json({message: "Hello World!!!"});
});

httpServer.listen(8000, () => {
    console.log("server is running on port: 8000");
});
