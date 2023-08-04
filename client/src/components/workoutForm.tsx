import axios from "axios";
import React, { useState } from "react";
import { io } from "socket.io-client";

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
      const response = await axios.post("http://localhost:8000/workouts/new", {
        name: workoutData.title,
      });
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={workoutData.title}
          onChange={handleChange}
          required
        ></input>
      </div>
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
