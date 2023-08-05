import React from "react";
import Navbar from "../commons/navbar/navbar";
import WorkoutForm from "../../components/workoutForm";
import AllWorkouts from "../../components/allWorkouts";

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
