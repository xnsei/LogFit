import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="weights" element={<WeightPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="exercises/:id" element={<ExercisePage />} />
            <Route path="workouts/:id" element={<WorkoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
