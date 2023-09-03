import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Carousel from "../../components/Carousel/carousel";
import { SmallCardWorkoutExercises } from "./smallCardWorkoutExercises";
import baseURL from "../../../links";

const socket = io(baseURL);

const SmallCardWorkouts = () => {
  const [workouts, setWorkouts] = useState(Array());

  const getWorkouts = async () => {
    try {
      const response = await axios.get(`${baseURL}/workouts`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.data;
      setWorkouts(data);
    } catch (error) {
      console.log(error);
    }
    return workouts;
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  useEffect(() => {
    socket.on("updateWeight", (_data: any) => {
      getWorkouts();
    });
  }, [socket]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.post(
        `${baseURL}/workouts/${id}/delete`,
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

  return (
    <div>
      <div className="headings-container">
        <h3 className="exercices-heading">All Workouts</h3>
      </div>
      <ul className="exercise-list">
        <Carousel>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <SmallCardWorkoutExercises
                baseUrl={`/workouts/${workout._id}`}
                workoutId={workout._id}
                workoutName={workout.name}
                onDelete={() => handleDelete(workout._id)}
              />
            </li>
          ))}
        </Carousel>
      </ul>
    </div>
  );
};

export default SmallCardWorkouts;
