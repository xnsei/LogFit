import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Carousel from "../../components/Carousel/carousel";
import { SmallCardWorkoutExercises } from "./smallCardWorkoutExercises";

const socket = io("http://localhost:8000");

const SmallCardWorkouts = () => {
  const [workouts, setWorkouts] = useState(Array());
  const [isLoading, setIsLoading] = useState(true);

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
    socket.on("updateWeight", (data: any) => {
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
                exerciseId={workout._id}
                workoutName={workout.name}
                onDelete={() => handleDelete(workout._id)}
              />
              meow
            </li>
          ))}
        </Carousel>
      </ul>
    </div>
  );
};

export default SmallCardWorkouts;
