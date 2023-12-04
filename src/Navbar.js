import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
 
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
  <Link to='/CourseList' className='navbar-brand ' >Course List </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
       
       
       
       
      </ul>
      
      <ul class="navbar-nav ">
        <li class="nav-item">
        <Link to='/Dashbord' className='nav-link ' >Dashboard </Link>
        </li>
        {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-sm btn-dark">
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
       
       
       
      </ul>
      
    </div>
  </div>
</nav>
  )
}

export default Navbar