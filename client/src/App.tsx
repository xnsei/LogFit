import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Workouts from "./pages/workouts/workouts";
import Exercises from "./pages/exercises/exercises";
import Register from "./pages/register/register";
import {Toaster} from "react-hot-toast";
import WeightPage from "@/src/pages/WeightPage/WeightPage.tsx";
import ExercisePage from "@/src/pages/ExercisePage/ExercisePage.tsx";
import WorkoutPage from "@/src/pages/WorkoutPage/WorkoutPage.tsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getWeights} from "@/lib/weights.ts";
import {setWeights} from "@/src/redux/weightSlice.ts";
import {getWorkouts} from "@/lib/workouts.ts";
import {setWorkouts} from "@/src/redux/workoutSlice.ts";
import {setExercises} from "@/src/redux/exerciseSlice.ts";
import {getAllExercises} from "@/lib/exercises.ts";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        getWeights().then((weights) => {
            dispatch(setWeights(weights));
        }).catch((error) => {
            console.log(error);
        });

        getWorkouts().then((workouts) => {
            console.log(workouts);
            dispatch(setWorkouts(workouts));
        }).catch((error) => {
            console.log(error);
        });

        getAllExercises().then((exercises) => {
            dispatch(setExercises(exercises));
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home/>}/>
                        <Route path="weights" element={<WeightPage/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="workouts" element={<Workouts/>}/>
                        <Route path="exercises" element={<Exercises/>}/>
                        <Route path="exercises/:id" element={<ExercisePage/>}/>
                        <Route path="workouts/:id" element={<WorkoutPage/>}/>
                    </Route>
                </Routes>
                <Toaster position="bottom-right"/>
            </div>
        </BrowserRouter>
    );
}

export default App;
