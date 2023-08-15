import React from "react";
import Navbar from "../commons/navbar/navbar";
import { ExerciseForm } from "./exerciseForm";
import { AllExercises } from "./allExercises";

const Exercises = () => {
  return (
    <>
      <Navbar />
      <AllExercises />
    </>
  );
};

export default Exercises;
