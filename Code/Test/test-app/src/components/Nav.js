import React from 'react';
import './components.css';
import { Link } from 'react-router-dom';


const navStyle = {
  color: 'white'
};

function Nav() {
  return (
    <nav>
        <h3>App Name</h3>
        <ul className="nav-links">
          <Link style={navStyle} to='/about'>
            <li>About Us</li>
          </Link>
          <Link style={navStyle} to='/contact'>
            <li>Contact</li>
          </Link>
          <Link style={navStyle} to='/profile'>
            <li>Profile</li>
          </Link>
        </ul>
    </nav>
  );
}

export default Nav;