import axios from "axios";
import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../commons/navbar/navbar";
import Weights from "./weights";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [message, setMessage] = useState("");
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
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <p>Workout Tracker Home</p>
        <Weights />
      </div>
    </div>
  );
};

export default Home;
