import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="d-flex text-center">
          <img className="logo-image" src={logo} alt="logo" />
          Cold- <span className="logo">Cast-Friday</span>
        </h1>
      </Link>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "text-white"
            }
            to="/"
            end
          >
            <i className="fa-solid fa-house"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/episodes"
            className={({ isActive }) =>
              isActive ? "active-link" : "text-white"
            }
          >
            Search Shows by fuzzy matching
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "active-link" : "text-white"
            }
          >
            Favourites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "active-link" : "text-white"
            }
          >
            <i className="fa-solid fa-phone"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "active-link" : "text-white"
            }
          >
            <i className="fa-solid fa-search"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "active-link" : "text-white"
            }
          >
            <i className="fa-solid fa-gear"></i>
          </NavLink>
        </li>
        <li className="text-white">
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              isActive ? "active-link" : "text-white"
            }
          >
            View By Genres
          </NavLink>
        </li>
      </ul>

      <div className="d-flex justify-content-end align-items-center">
        <NavLink
          to="/log-in"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <i className="fa-solid fa-right-to-bracket"></i>
        </NavLink>
        <NavLink
          className="btn btn-outline-dark signup"
          style={{ color: "white" }}
          to="/sign-up"
        >
          Sign Up
          <i className="fa-solid fa-user ml-2"></i>
        </NavLink>
      </div>
    </header>
  );
}
