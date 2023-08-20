import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { WorkoutProps } from "./workoutProps";
import { ExerciseEntries } from "./entries";
import Modal from "../../components/Modal/modal";
import { WorkoutExercisesForm } from "./exerciseForm";
import "./allExercises.css";
import Carousel from "../../components/Carousel/carousel";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const AllExercises = () => {
  const [exercises, setExercises] = useState(Array());
  const [isLoading, setIsLoading] = useState(true);

  const getExercises = async () => {
    try {
      const response = await axios.get(baseURL + "/exercises", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
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

const WorkoutExercises = (props: WorkoutProps) => {
  const [exercises, setExercises] = useState(Array());
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const getExercises = async () => {
    try {
      const response = await axios.get(
        baseURL + `/workouts/${props.id}/exercises`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
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
    socket.on("updateExercise", (data: any) => {
      getExercises();
    });
  }, [socket]);

  useEffect(() => {
    getExercises();
  }, []);

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
      <div className="headings-container">
        <h3 className="exercices-heading">All Exercises</h3>
        <button className="add-exercise-button" onClick={openModal}>
          Add Exercise
        </button>
      </div>
      <Modal isOpen={showModal} onClose={closeModal}>
        <WorkoutExercisesForm id={props.id} />
      </Modal>
      <ul className="exercise-list">
        <Carousel>
          {exercises.map((exercise) => (
            <li key={exercise._id}>
              {/* <div className="exercise-container">
                <div>{exercise.name}</div>
                <div className="exercise-container-child">
                  <Entries
                    exerciseId={exercise._id}
                    numberOfEntriesREquested={1}
                  />
                  <button
                    className="exercise-delete-button"
                    onClick={() => handleDelete(exercise._id)}
                  >
                    Delete
                  </button>
                </div>
              </div> */}
              {/* <SmallCard
                title={exercise.name}
                onDelete={() => handleDelete(exercise._id)}
                subTitile={"Entries"}
                isWeights={false}
                namesList={}
              /> */}

              <ExerciseEntries
                exerciseId={exercise._id}
                exerciseName={exercise.name}
                onDelete={() => handleDelete(exercise._id)}
              />
            </li>
          ))}
        </Carousel>
      </ul>
    </div>
  );
};

export { AllExercises, WorkoutExercises };
