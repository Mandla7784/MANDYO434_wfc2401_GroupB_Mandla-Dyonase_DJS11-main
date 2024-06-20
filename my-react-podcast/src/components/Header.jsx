import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {


  return (
    <header className="header">
      <h1 className="d-flex  text-center">
        <img className="logo-image" src={logo} alt="logo" />
        Cold- <span className="logo">Cast-Friday</span>
      </h1>
      <ul  style={}>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "text-white"
            }
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
            activeClassName="active-link"
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
            activeClassName="active-link"
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
            activeClassName="active-link"
          ></NavLink>
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
      </ul>

      <div>
        <NavLink to="/log-in" activeClassName="active-link">
          <i className="fa-solid fa-right-to-bracket"></i>
        </NavLink>
        <NavLink
          className="btn btn-outline-light  "
          style={{ color: "white" }}
          to="/sign-up"
          activeClassName="active-link"
        >
          Sign Up
          <i className="fa-solid fa-user ml-2"></i>
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
