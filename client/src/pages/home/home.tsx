import axios from "axios";
import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../commons/navbar/navbar";
import Weights from "../weights/weights";
import { useNavigate } from "react-router-dom";
import { AllExercises } from "../exercises/allExercises";
import SmallCardWorkouts from "../workouts/smallCardWorkouts";

const Home = () => {
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
        <div className="workouts">
          <SmallCardWorkouts />
        </div>
        <div className="exercises">
          <AllExercises />
        </div>
      </div>
    </div>
  );
};

export default Home;
