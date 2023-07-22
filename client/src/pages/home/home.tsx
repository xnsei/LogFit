import React, { useState, useEffect } from "react";
import Sidebar from "../commons/sidebar/sidebar";
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
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <p>Workout Tracker Home</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Home;
