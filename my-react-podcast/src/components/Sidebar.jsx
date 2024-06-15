// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faHistory, faList } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const closeSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  };

  return (
    <div className="sidebar ">
      <h4>
        New{" "}
        <span className="logo" style={{ color: "#ff9d2e" }}>
          Talk
        </span>
      </h4>
      <ul>
        <li>
          <NavLink to="/home">
            <FontAwesomeIcon icon={faVideo} /> Videos
          </NavLink>
        </li>
        <li>
          <NavLink to="/episodes">
            <FontAwesomeIcon icon={faHistory} /> History
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            <FontAwesomeIcon icon={faList} /> PlayLists
          </NavLink>
        </li>
      </ul>
      <span onClick={closeSidebar} className="close-btn ">
        {" "}
        <i className="fa-solid fa-xmark"></i>
      </span>
    </div>
  );
};

export default Sidebar;
