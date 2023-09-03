import axios from "axios";
import { useState } from "react";
import { io } from "socket.io-client";
import "./workoutForm.scss";
import baseURL from "../../../links";

const socket = io(baseURL);

interface WorkoutFormProps {
  onCloseModal: (event: React.MouseEvent<HTMLElement>) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = (props: WorkoutFormProps) => {
  const [workoutData, setWorkoutData] = useState({
    title: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setWorkoutData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addWorkout = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/workouts/new`,
        {
          name: workoutData.title,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        socket.emit("addWorkout", {});
        console.log("event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.onCloseModal(e);
    addWorkout();
  };

  return (
    <div className="form-box">
      <h2 className="form-heading">Add a Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="form-input"
            type="text"
            id="title"
            name="title"
            value={workoutData.title}
            onChange={handleChange}
            placeholder="Workout Title"
            required
          ></input>
        </div>
        <button className="form-button" type="submit">
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
