import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./showWorkout.scss";
import { BigCardExerciseEntries } from "../exercises/entries";
import { io } from "socket.io-client";
import Modal from "../../components/Modal/modal";
import { WorkoutExercisesForm } from "../exercises/exerciseForm";
import Navbar from "../commons/navbar/navbar";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const ShowWorkout = () => {
  const location = useLocation();
  const workout = location.state.workout;

  const [exercises, setExercises] = useState(Array());
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const navigate = useNavigate();

  const authenticate = async () => {
    try {
      const response = await axios.get("http://localhost:8000/authenticate", {
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
      const response = await axios.get(
        baseURL + `/workouts/${workout._id}/exercises`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
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

  const ExerciseFormModal = (
    <div className="exerciseFormModal">
      <button onClick={openModal}>Add Exercise</button>
      <Modal isOpen={showModal} onClose={closeModal}>
        <WorkoutExercisesForm id={workout._id} />
      </Modal>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="workout-page">
        <div className="headings-container">
          <h1 className="heading">{workout.name}</h1>
          {ExerciseFormModal}
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

export default ShowWorkout;
