import React from "react";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div onClick={() => navigate("/")} className="logo-heading">
          LogFit
        </div>
        <ul className="nav-links">
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/workouts")}>Workouts</button>
          </li>
          <li>
            <button onClick={() => navigate("/exercises")}>Exercises</button>
          </li>
        </ul>
      </div>
      <div className="user-container">
        <button onClick={logout} className="logout-button">
          <LogoutIcon className="nav-links" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
