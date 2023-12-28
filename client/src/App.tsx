import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Workouts from "./pages/workouts/workouts";
import Exercises from "./pages/exercises/exercises";
import Register from "./pages/register/register";
import {Toaster} from "react-hot-toast";
import WeightPage from "@/src/pages/WeightPage/WeightPage.tsx";

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
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
