import React from "react";
import "./Sidebar.css";
import { useSidebar } from "./SidebarContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaHome, FaUser, FaClipboardList, FaBriefcase, FaSignOutAlt } from "react-icons/fa";


const Sidebar = () => {

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
       <button className="arrow" onClick={toggleSidebar}>
             
                {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
              </button>



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
    <FaHome className="nav-img-icon" />
    <span>Dashboard</span>
  </li>
  <li className="nav-item">
    <FaUser className="nav-img-icon" />
    <span>Profile</span>
  </li>
  <li className="nav-item">
    <FaClipboardList className="nav-img-icon" />
    <span>Applications</span>
  </li>
  <li className="nav-item active">
    <FaBriefcase className="nav-img-icon" />
    <span>Jobs</span>
  </li>
</ul>
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
  <FaSignOutAlt className="nav-img-icon" />
  <span>Logout</span>
</div>
    </div>
  );
};

export default Sidebar;
