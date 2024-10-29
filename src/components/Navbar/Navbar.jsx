import React from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import logo from "../../assets/images/logo1.png";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false); 
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark sticky-top container-fluid'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} alt='QuikVote Logo' width='100' height='auto' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav mx-auto'>
            {isAuthenticated ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/vote'>
                    Vote
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/dashboard'>
                    Dashboard
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/settings'>
                    Settings
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/profile'>
                    Profile
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/' onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className
                ='nav-link' to='/login'>
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className='nav-link' to='/signup'>
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className='nav-link' to='/how-it-works'>
                    HowItWorks
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
