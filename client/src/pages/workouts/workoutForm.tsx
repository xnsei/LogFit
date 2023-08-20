import axios from "axios";
import React, { useState } from "react";
import { io } from "socket.io-client";
import "./workoutForm.css";

const socket = io("http://localhost:8000");

const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    title: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setWorkoutData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addWorkout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/workouts/new",
        {
          name: workoutData.title,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        socket.emit("addWorkout", {});
        console.log("event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addWorkout();
  };

  return (
    <div className="form-box">
      <h2 className="form-heading">Add a Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="form-input"
            type="text"
            id="title"
            name="title"
            value={workoutData.title}
            onChange={handleChange}
            placeholder="Workout Title"
            required
          ></input>
        </div>
        <button className="form-button" type="submit">
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
