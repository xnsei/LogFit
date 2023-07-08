import React from "react";
import Sidebar from "../commons/sidebar/sidebar";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <p>Workout Tracker Home</p>
      </div>
    </div>
  );
};

export default Home;
