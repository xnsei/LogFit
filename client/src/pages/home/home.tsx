import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../commons/navbar/navbar";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <p>Workout Tracker Home</p>
      </div>
    </div>
  );
};

export default Home;
