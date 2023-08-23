import axios from "axios";
import React, { useEffect, useState } from "react";
import "./allWorkouts.css";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { WorkoutExercises } from "../exercises/allExercises";

const socket = io("http://localhost:8000");

const AllWorkouts = () => {
  const [workouts, setWorkouts] = useState(Array());
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/workouts", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
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
        `http://localhost:8000/workouts/${id}/delete`,
        null,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
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
      const response = await axios.get(`http://localhost:8000/workouts/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        navigate("/workout/view", { state: { workout: response.data } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="workouts-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="workouts-list">
            {workouts.map((workout) => (
              <li key={workout._id}>
                <div className="workout-card">
                  <div className="card-heading-container">
                    <div
                      onClick={() => handleView(workout._id)}
                      className="workout-title"
                    >
                      {workout.name}
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(workout._id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="card-exercises">
                    <WorkoutExercises
                      id={workout._id}
                      baseUrl={`/workouts/${workout._id}`}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllWorkouts;
