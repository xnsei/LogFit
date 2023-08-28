import { useEffect, useState } from "react";
import "./workouts.scss";
import axios from "axios";
import Navbar from "../commons/navbar/navbar";
import WorkoutForm from "./workoutForm";
import AllWorkouts from "./allWorkouts";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/modal";

const Workouts = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const authenticate = async () => {
    try {
      const response = await axios.get(
        "https://logfit-backend.onrender.com/authenticate",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
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
    <div>
      <Navbar />
      <div className="workouts-page">
        <Modal isOpen={showModal} onClose={closeModal}>
          <WorkoutForm />
        </Modal>
        <div className="heading">
          <h1 className="workouts-heading">All Workouts</h1>
          <button className="add-workout-button" onClick={openModal}>
            Add Workout
          </button>
        </div>
        <AllWorkouts />
      </div>
    </div>
  );
};

export default Workouts;
