import React from 'react';

function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="#/" className="brand-link text-center" onClick={(e) => e.preventDefault()}>
        <i className="fas fa-file-pdf fa-2x text-white" />
        <span className="brand-text font-weight-light ml-2">Resume Builder</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
            <li className="nav-item">
              <a href="#form" className="nav-link active">
                <i className="nav-icon fas fa-edit" />
                <p>Build Resume</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#form" className="nav-link">
                <i className="nav-icon fas fa-palette" />
                <p>Choose Theme</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
