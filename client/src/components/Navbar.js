import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link 
        className="navbar-brand" 
        to="/">
        Recipe Search
      </Link>
      <ul className="nav">
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
      </ul>
    </nav>
  )
}

export default Navbar;
