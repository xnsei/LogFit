import React, { useEffect } from "react";
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
    <>
      <Navbar />
      <WorkoutForm />
      <AllWorkouts />
    </>
  );
};

export default Workouts;
