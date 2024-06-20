import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHistory,
  faList,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"; //
import "./Sidebar.css"; // Import custom CSS for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h4>
        New{" "}
        <span className="logo" style={{ color: "#ff9d2e" }}>
          Talk
        </span>
      </h4>
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/home"
            activeClassName="active-link"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faStar} /> Favorites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/episodes"
            activeClassName="active-link"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faHistory} /> History
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/playlists"
            activeClassName="active-link"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faList} /> Playlists
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
