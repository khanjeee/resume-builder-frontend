import React from 'react';

function Header({ handleLogout }) {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#/" role="button" onClick={(e) => e.preventDefault()}><i className="fas fa-bars" /></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <span className="nav-link font-weight-bold">Resume Builder</span>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button type="button" className="btn btn-sm btn-danger" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt mr-1" /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
