import React from "react";
import { useLocation } from "react-router-dom";

const ShowWorkout = () => {
  const location = useLocation();
  const workout = location.state.workout;

  return (
    <div>
      <h1>{workout.name}</h1>
    </div>
  );
};

export default ShowWorkout;
