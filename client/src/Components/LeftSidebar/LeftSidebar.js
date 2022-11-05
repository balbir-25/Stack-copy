import React from "react";
import { NavLink } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import "./LeftSidebar.css";

function LeftSidebar() {
  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink to="/" className="side-nav-links" activclassname="active">
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div>
            <p>Public</p>
          </div>
          <NavLink
            to="/Questions"
            className="side-nav-links"
            activeclassname="active"
          >
            <PublicIcon />
            <p style={{ paddingLeft: "10px" }}> Questions </p>
          </NavLink>
          <NavLink
            to="/Tags"
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Tags</p>
          </NavLink>
          <NavLink
            to="/Users"
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Users</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default LeftSidebar;
