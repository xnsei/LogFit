import React, { useEffect } from "react";
import "./workouts.css";
import axios from "axios";
import Navbar from "../commons/navbar/navbar";
import WorkoutForm from "./workoutForm";
import AllWorkouts from "./allWorkouts";
import { useNavigate } from "react-router-dom";

const Workouts = () => {
  const navigate = useNavigate();

  const authenticate = async () => {
    try {
      const response = await axios.get("http://localhost:8000/authenticate", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (response.status !== 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    authenticate();
  }, []);
  return (
    <div>
      <Navbar />
      <WorkoutForm />
      <div className="workout-container">
        <AllWorkouts />
      </div>
    </div>
  );
};

export default Workouts;
