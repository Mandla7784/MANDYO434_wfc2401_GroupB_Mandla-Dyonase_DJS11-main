// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faHistory, faList } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h4>
        Cold-cast- <span>Friday</span>
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
    </div>
  );
};

export default Sidebar;
