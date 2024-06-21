import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";
import SidebarOpener from "./SidebarToggler";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="d-flex text-center">
          <img className="logo-image" src={logo} alt="logo" />
          Cold- <span className="logo">Cast-Friday</span>
        </h1>
      </Link>

      <SidebarOpener />
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
            to="/settings"
            className={({ isActive }) =>
              isActive ? "active-link" : "text-white"
            }
          ></NavLink>
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
        ></NavLink>
      </div>
    </header>
  );
}
