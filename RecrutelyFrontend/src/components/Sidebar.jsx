// import React from "react";
// import "./Sidebar.css";

// import { useSidebar } from "../context/SidebarContext";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import {
//   FaHome,
//   FaUser,
//   FaClipboardList,
//   FaBriefcase,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { NavLink,useNavigate } from "react-router-dom";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const Sidebar = () => {
//   const { isSidebarOpen, toggleSidebar } = useSidebar();
//     const navigate = useNavigate();

//    const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//       <div className="arrow" onClick={toggleSidebar}>
//         {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
//       </div>

//       <div className="sidebar-header">
//         <div className="avatar-circle">CD</div>
//         <div>
//           <h1 className="sidebar-title">Candidate</h1>
//           <p className="sidebar-subtitle">Dashboard</p>
//         </div>
//       </div>

//       {/* Navigation items */}
//       <nav className="sidebar-nav">
//         <ul>
//           <NavLink
//             className="nav-item"
//             to="/candidate/dashboard"
//             activeClassName="active"
//           >
//             <FaHome className="nav-img-icon" />
//             <span>Dashboard</span>
//           </NavLink>
//           <NavLink className="nav-item" to="/candidate/profile" activeClassName="active">
//             <FaUser className="nav-img-icon" />
//             <span>Profile</span>
//           </NavLink>
//           <NavLink
//             className="nav-item"
//             to="/candidate/application"
//             activeClassName="active"
//           >
//             <FaClipboardList className="nav-img-icon" />
//             <span>Applications</span>
//           </NavLink>
//           <NavLink className="nav-item" to="/candidate/jobs" activeClassName="active">
//             <FaBriefcase className="nav-img-icon" />
//             <span>Jobs</span>
//           </NavLink>
//         </ul>
//       </nav>

//       {/* Logout */}
//       <div className="sidebar-footer" onClick={handleLogout}>
//         <FaSignOutAlt className="nav-img-icon"   />
//         <span>Logout</span>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import "./EmployerSidebar.css";
import { useSidebar } from "../context/SidebarContext";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaBriefcase,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    // The class now comes from the context, which is perfect
    <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
      {/* Toggle arrow for desktop */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </div>

      <div className="sidebar-header">
        <div className="avatar-circle">CD</div>
        <div className="user-info">
          <h1 className="sidebar-title">Candidate</h1>
          <p className="sidebar-subtitle">Dashboard</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          className={({ isActive }) =>
            `nav-item ${isActive ? "active-link" : ""}`
          }
          to="/candidate/dashboard"
        >
          <FaHome className="nav-icon" />
          <span className="nav-text">Dashboard</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-item ${isActive ? "active-link" : ""}`
          }
          to="/candidate/profile"
        >
          <FaUser className="nav-icon" />
          <span className="nav-text">Profile</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-item ${isActive ? "active-link" : ""}`
          }
          to="/candidate/application"
        >
          <FaClipboardList className="nav-icon" />
          <span className="nav-text">Applications</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-item ${isActive ? "active-link" : ""}`
          }
          to="/candidate/jobs"
        >
          <FaBriefcase className="nav-icon" />
          <span className="nav-text">Jobs</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer" onClick={handleLogout}>
        <FaSignOutAlt className="nav-icon" />
        <span className="nav-text">Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
