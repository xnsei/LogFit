import React from "react";
import "./navbar.css";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="icons">
          <NightsStayIcon className="icon" />
          <AccountCircleIcon className="icon" />
          <LogoutIcon className="icon" />
        </div>
      </div>
      {/* <hr /> */}
    </div>
  );
};

export default Navbar;
