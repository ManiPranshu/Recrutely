import React from "react";
import "./Sidebar.css";

import dashboardIcon from "/assets/home.png";
import userIcon from "/assets/profile.png";
import applicationsIcon from "/assets/applicationicon.png";
import jobsIcon from "/assets/jobs.png";
import logoutIcon from "/assets/logout.png";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Logo and heading */}
      <div className="sidebar-header">
        <div className="avatar-circle">CD</div>
        <div>
          <h1 className="sidebar-title">Candidate</h1>
          <p className="sidebar-subtitle">Dashboard</p>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            
              <img
                src={dashboardIcon}
                alt="Dashboard"
                className="nav-img-icon"
              />
          

            <span>Dashboard</span>
          </li>
          <li className="nav-item">
            
              <img src={userIcon} alt="Profile" className="nav-img-icon" />
         
            <span>Profile</span>
          </li>
          <li className="nav-item">

              <img
                src={applicationsIcon}
                alt="Applications"
                className="nav-img-icon"
              />

            <span>Applications</span>
          </li>
          <li className="nav-item">

              <img src={jobsIcon} alt="Jobs" className="nav-img-icon" />


            <span>Jobs</span>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <img src={logoutIcon} alt="Logout" className="nav-img-icon" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
