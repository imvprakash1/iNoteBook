import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
    let location=useLocation();
    const navigate=useNavigate();
    const handleLogOut=(e)=>{
      e.preventDefault();
      localStorage.removeItem('token');
      navigate('/login');
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link to='/login' className='btn btn-primary mx-2' role='button'>Login</Link>
        <Link to='/signup' className='btn btn-primary mx-2' role='button'>Sign Up</Link>
      </form>:<button className='btn btn-primary' onClick={handleLogOut}>Log Out</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar