import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../commons/navbar/Navbar.tsx";
import { useNavigate } from "react-router-dom";
import { BigCardExerciseEntries } from "../exercises/entries";
import { io } from "socket.io-client";
import baseURL from "../../../links";

const socket = io(baseURL);

export interface exercise {
    _id: string;
    name: string;
}
const BigCardExercises = () => {
  const [exercises, setExercises] = useState(Array<exercise>());

  const navigate = useNavigate();

  const authenticate = async () => {
    try {
      const response = await axios.get(`${baseURL}/authenticate`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (response.status !== 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const getExercises = async () => {
    try {
      const response = await axios.get(baseURL + `/exercises`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.data;
      setExercises(data);
    } catch (error) {
      console.log(error);
    }
    return exercises;
  };

  useEffect(() => {
    authenticate();
    getExercises();
  }, []);

  useEffect(() => {
    socket.on("updateExercise", (_data: any) => {
      getExercises();
    });
  }, [socket]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.post(
        `${baseURL}/exercises/${id}/delete`,
        null,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
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
      <div className="workout-page">
        <div className="headings-container">
          <h1 className="heading">All Exercises</h1>
        </div>
        <ul className="exercise-list">
          {exercises.map((exercise) => (
            <li key={exercise._id}>
              <BigCardExerciseEntries
                exerciseId={exercise._id}
                exerciseName={exercise.name}
                onDelete={() => handleDelete(exercise._id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Exercises = () => {
  const navigate = useNavigate();

  const authenticate = async () => {
    try {
      const response = await axios.get(`${baseURL}/authenticate`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (response.status !== 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    authenticate();
  }, []);
  return (
    <>
      <Navbar />
      <BigCardExercises />
    </>
  );
};

export default Exercises;
