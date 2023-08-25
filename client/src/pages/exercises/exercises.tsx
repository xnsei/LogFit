import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../commons/navbar/navbar";
import { AllExercises } from "./allExercises";
import { useNavigate } from "react-router-dom";

const Exercises = () => {
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
    <>
      {/* <Navbar /> */}
      <AllExercises />
    </>
  );
};

export default Exercises;
