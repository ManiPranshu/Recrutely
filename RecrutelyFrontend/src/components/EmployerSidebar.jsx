import React from "react";
import "./EmployerSidebar.css";
import { useEmployerSidebar } from "../context/EmployerSidebarContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaBriefcase,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const EmployerSidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useEmployerSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </div>

      <div className="sidebar-header">
        <div className="avatar-circle">ED</div>
        <div>
          <h1 className="sidebar-title">Employer</h1>
          <p className="sidebar-subtitle">Dashboard</p>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="sidebar-nav">
        <ul>
          <NavLink
            className={({ isActive }) =>
              `nav-item ${isActive ? "active-link" : ""}`
            }
            to="/employer/rdashboard"
            activeClassName="active"
          >
            <FaHome className="nav-img-icon" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item ${isActive ? "active-link" : ""}`
            }
            to="/employer/rprofile"
            activeClassName="active"
          >
            <FaUser className="nav-img-icon" />
            <span>Profile</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item ${isActive ? "active-link" : ""}`
            }
            to="/employer/postjob"
            activeClassName="active"
          >
            <FaClipboardList
              className={({ isActive }) =>
                `nav-item ${isActive ? "active-link" : ""}`
              }
            />
            <span>Post Job</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item ${isActive ? "active-link" : ""}`
            }
            to="/employer/joblisting"
            activeClassName="active"
          >
            <FaBriefcase className="nav-img-icon" />
            <span>Job Listing</span>
          </NavLink>
        </ul>
      </nav>

      {/* Logout */}
      <div className="sidebar-footer" onClick={handleLogout}>
        <FaSignOutAlt className="nav-img-icon" />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default EmployerSidebar;
