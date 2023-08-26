import axios from "axios";
import React, { useState } from "react";
import { io } from "socket.io-client";
import { WorkoutProps } from "./workoutProps";
import "./exerciseForm.scss";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const WorkoutExercisesForm = (props: WorkoutProps) => {
  const [exerciseData, setExerciseData] = useState({ title: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addExercise = async () => {
    try {
      const response = await axios.post(
        baseURL + `/workouts/${props.id}/exercises/new`,
        {
          name: exerciseData.title,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
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
    <div>
      <div className="form-box">
        <h2 className="form-heading">Add an Exercise</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="form-input"
              type="text"
              id="title"
              name="title"
              value={exerciseData.title}
              onChange={handleChange}
              placeholder="Exercise Title"
              required
            />
          </div>
          <button className="form-button" type="submit">
            Add Exercise
          </button>
        </form>
      </div>
    </div>
  );
};

export { WorkoutExercisesForm };
