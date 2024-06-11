// import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="header">
      <h1 className="d-flex  text-center">
        <img className="logo-image" src={logo} alt="logo" />
        Cold- <span className="logo">Cast-Friday</span>
      </h1>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            exact
            to="/"
            activeClassName="active-link"
          >
            <i className="fa-solid fa-house"></i>
          </NavLink>
        </li>
        <li>
          {/* used Navlinks to establish active link styling  */}
          <NavLink
            to="/episodes"
            activeClassName="active-link"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Episodes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            activeClassName="active-link"
          >
            About
          </NavLink>
        </li>
      </ul>

      <div>
        <NavLink to="/log-in" activeClassName="active-link">
          {/* <i className="fa-solid fa-right-to-bracket"></i> */}
        </NavLink>
        <NavLink to="/sign-up" activeClassName="active-link">
          Sign Up
          <i className="fa-solid fa-user  text-yellow-500"></i>
        </NavLink>
      </div>
    </header>
  );
}

/**
 * @returns {JSX.Element}
 *
 *
 *
 */
