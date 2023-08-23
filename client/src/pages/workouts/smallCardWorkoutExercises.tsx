import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SmallCard from "../../components/Card/small/smallCard";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

interface ExerciseProps {
  baseUrl: string;
  workoutName: string;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
  exerciseId: string;
}

const SmallCardWorkoutExercises: React.FC<ExerciseProps> = (
  props: ExerciseProps
) => {
  const [exercises, setExercises] = useState(Array());

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
    socket.on("updateWeight", (data: any) => {
      getExercises();
    });
  }, [socket]);

  return (
    <div>
      <SmallCard
        title={props.workoutName}
        onDelete={props.onDelete}
        subTitile={"Exercises"}
        isWeights={false}
        namesList={exercises.map((exercice) => ({
          _id: exercice._id,
          url: `${baseURL}/exercises/${props.exerciseId}/delete`,
          data: {
            entry: exercice.name,
          },
        }))}
      />
    </div>
  );
};

export { SmallCardWorkoutExercises };
