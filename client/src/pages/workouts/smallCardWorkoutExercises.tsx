import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SmallCard from "../../components/Card/small/smallCard";
import Modal from "../../components/Modal/modal";
import { WorkoutExercisesForm } from "../exercises/exerciseForm";

const baseURL = "https://logfit-backend.onrender.com";

const socket = io(baseURL);

interface ExerciseProps {
  baseUrl: string;
  workoutName: string;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
  workoutId: string;
}

const SmallCardWorkoutExercises: React.FC<ExerciseProps> = (
  props: ExerciseProps
) => {
  const [exercises, setExercises] = useState(Array());
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const getExercises = async () => {
    try {
      const response = await axios.get(baseURL + `${props.baseUrl}/exercises`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.data.splice(0, 3);
      setExercises(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  useEffect(() => {
    socket.on("updateWeight", (_data: any) => {
      getExercises();
    });
  }, [socket]);

  const exerciseFormModal = (
    <div>
      <button onClick={openModal}>Add Exercise</button>
      <Modal isOpen={showModal} onClose={closeModal}>
        <WorkoutExercisesForm onCloseModal={closeModal} id={props.workoutId} />
      </Modal>
    </div>
  );

  return (
    <div>
      <SmallCard
        title={props.workoutName}
        entryModal={exerciseFormModal}
        onDelete={props.onDelete}
        subTitile={"Exercises"}
        isWeights={false}
        namesList={exercises.map((exercise) => ({
          _id: exercise._id,
          url: `${baseURL}/exercises/${exercise._id}/delete`,
          data: {
            entry: exercise.name,
          },
        }))}
      />
    </div>
  );
};

export { SmallCardWorkoutExercises };
