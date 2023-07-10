import React from "react";
import "./sidebar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const Sidebar = () => {
  return (
    <div className="sideBar">
      <div className="top">
        <span className="logo">LogFit</span>
      </div>
      <div className="center">
        <p className="title">Workouts</p>
        <ul>
          <li className="text">Push-Pull-Legs Split</li>
          <li className="text">Upper-Lower Split</li>
          <li className="text">Full Body Workout</li>
        </ul>
        <p className="title">Custom Workouts</p>
        <ul>
          <li>
            <AddBoxOutlinedIcon className="icon" />
            <span>Create</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <p className="title">User</p>
        <ul>
          <li>
            <AccountCircleIcon className="icon" />
            <span className="text">Profile</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span className="text">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
