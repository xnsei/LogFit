import axios from "axios";
import { useEffect } from "react";
import "./home.scss";
import Navbar from "../commons/navbar/navbar";
import Weights from "../weights/weights";
import { useNavigate } from "react-router-dom";
import { AllExercises } from "../exercises/allExercises";
import SmallCardWorkouts from "../workouts/smallCardWorkouts";
import baseURL from "../../../utils/links";

const Home = () => {
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
    <div>
      <Navbar />
      <div className="home-page">
        <div className="home">
          <Weights />
        </div>
        <div className="BigCard">
          <SmallCardWorkouts />
        </div>
        <div className="BigCard">
          <AllExercises />
        </div>
      </div>
    </div>
  );
};

export default Home;
