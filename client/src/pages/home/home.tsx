import React from "react";
import Sidebar from "../commons/sidebar/sidebar";
import "./home.css";
import Navbar from "../commons/navbar/navbar";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <p>Workout Tracker Home</p>
      </div>
    </div>
  );
};

export default Home;
