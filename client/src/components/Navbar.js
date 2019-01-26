import React from 'react';
import {Link, NavLink} from 'react-router-dom';
// import API from "../utils/API";
const Navbar = props => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link 
        className="navbar-brand" 
        to="/">
        World Cuisine Recipes
      </Link>
      <ul className="nav ml-auto">
        <li className="nav-item">
          <NavLink 
            className={`nav-link text-info ${window.location.pathname === "/" ? "text-danger" : ""}`} 
            to="/">
            Search For Recipes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            className={`nav-link text-info ${window.location.pathname === "/favorites" ? "text-danger" : ""}`} 
            to="/favorites">
            View Favorite Recipes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={`nav-link text-info`}
            to='#'
            onClick={
              props.auth.isAuthenticated() ? () => props.auth.logout() : () => props.auth.login()
            }
            >
            {
              props.auth.isAuthenticated() ? 'logout' : 'login'}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
