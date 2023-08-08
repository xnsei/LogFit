import axios from "axios";
import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const ExerciseForm = () => {
  const [exerciseData, setExerciseData] = useState({
    title: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addExercise = async () => {
    try {
      const response = await axios.post("http://localhost:8000/exercises/new", {
        name: exerciseData.title,
      });
      if (response.status === 200) {
        socket.emit("addExercise", {});
        console.log("event emitted");
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
        ></input>
      </div>
      <button type="submit">Add Exercise</button>
    </form>
  );
};

export default ExerciseForm;
