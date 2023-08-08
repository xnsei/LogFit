import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8000");

const AllExercises = () => {
  const [exercises, setExercises] = useState(Array());
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getExercises = async () => {
    try {
      const response = await axios.get("http://localhost:8000/exercises");
      const data = await response.data;
      setExercises(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    return exercises;
  };

  useEffect(() => {
    getExercises();
  }, []);

  useEffect(() => {
    socket.on("updateExercise", (data: any) => {
      getExercises();
    });
  }, [socket]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/exercises/${id}/delete`
      );
      if (response.status === 200) {
        socket.emit("deleteExercise", {});
        console.log("event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>All Exercises</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise._id}>
              <div>{exercise.name}</div>
              <button onClick={() => handleDelete(exercise._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllExercises;
