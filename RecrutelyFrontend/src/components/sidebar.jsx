import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaRegFileAlt, FaBriefcase, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./sidebar.css";
import { useSidebar } from "../context/sidebarContext";

const SidebarLink = ({ to, label, icon, collapsed }) => {
  return (
    <NavLink  
      to={to}
      className={({ isActive }) => (isActive ? "active" : "notactive")}
    >
      <span className="link-content">
        {icon && <span className="icon">{icon}</span>}
        {!collapsed && <span className="label">{label}</span>}
      </span>
    </NavLink>
  );
};

const Sidebar = () => {
  const {toggleSidebar, collapsed} = useSidebar();

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        {collapsed ? (
          <FaChevronRight size="1.2rem" color="white" />
        ) : (
          <FaChevronLeft size="1.2rem" color="white" />
        )}
      </div>

      <SidebarLink
        to="/dashboard"
        label={"Dashboard"}
        icon={<FaHome size="1rem" color="white" />}
        collapsed={collapsed}
      />

      <SidebarLink
        to="/profile"
        label={"Profile"}
        icon={<FaUser size="1rem" color="white" />}
        collapsed={collapsed}
      />

      <SidebarLink
        to="/application"
        label={"Application"}
        icon={<FaRegFileAlt size="1rem" color="white" />}
        collapsed={collapsed}
      />

      <SidebarLink
        to="/job"
        label={"Job"}
        icon={<FaBriefcase size="1rem" color="white" />}
        collapsed={collapsed}
      />
    </div>
  );
};

export default Sidebar;
