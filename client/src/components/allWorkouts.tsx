import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8000");

const AllWorkouts = () => {
  const [workouts, setWorkouts] = useState(Array());
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/workouts");
      const data = await response.data;
      setWorkouts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    return workouts;
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  useEffect(() => {
    socket.on("updateWorkout", (data: any) => {
      getWorkouts();
    });
  }, [socket]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/workouts/${id}/delete`
      );
      if (response.status === 200) {
        socket.emit("deleteWorkout", {});
        console.log("event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/workouts/${id}`);
      if (response.status === 200) {
        navigate("/workout/view", { state: { workout: response.data } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>All Workouts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <div>{workout.name}</div>
              <button onClick={() => handleView(workout._id)}>View</button>
              <button onClick={() => handleDelete(workout._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllWorkouts;
