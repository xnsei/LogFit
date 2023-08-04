import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Workouts from "./pages/workouts/workouts";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="workouts" element={<Workouts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
