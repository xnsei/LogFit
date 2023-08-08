import React from "react";
import Navbar from "../commons/navbar/navbar";
import WorkoutForm from "./workoutForm";
import AllWorkouts from "./allWorkouts";

const Workouts = () => {
  return (
    <>
      <Navbar />
      <WorkoutForm />
      <AllWorkouts />
    </>
  );
};

export default Workouts;
