import axios from "axios";
import React, { useState } from "react";
import { io } from "socket.io-client";
import { WorkoutProps } from "./workoutProps";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const ExerciseForm = () => {
  const [exerciseData, setExerciseData] = useState({ title: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addExercise = async () => {
    try {
      const response = await axios.post(baseURL + "/exercises/new", {
        name: exerciseData.title,
      });
      if (response.status === 200) {
        socket.emit("addExercise", {});
        console.log("all exercise add event event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addExercise();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={exerciseData.title}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Exercise</button>
    </form>
  );
};

const WorkoutExercisesForm = (props: WorkoutProps) => {
  const [exerciseData, setExerciseData] = useState({ title: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addExercise = async () => {
    try {
      const response = await axios.post(
        baseURL + `/workouts/${props.id}/exercises`,
        {
          name: exerciseData.title,
        }
      );
      if (response.status === 200) {
        socket.emit("addExercise", {});
        console.log("workout exercise add event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addExercise();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={exerciseData.title}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Exercise</button>
    </form>
  );
};

export { ExerciseForm, WorkoutExercisesForm };
