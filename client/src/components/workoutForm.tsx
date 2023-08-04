import axios from "axios";
import React, { useState } from "react";

const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    title: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setWorkoutData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addWorkout = async (title: string) => {
    try {
      const response = await axios.post("http://localhost:8000/workouts/new", {
        name: title,
      });
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addWorkout(workoutData.title);
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
