import React from "react";
import bell from "/assets/bell.png";
import moon from "/assets/moon.png";
import profilepic from "/assets/unnamed.png";
import menu from "/assets/menu.png";
import "./Header.css"; 
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext"; // ADD THIS
import { FaChevronLeft, FaChevronRight,FaBars } from "react-icons/fa"; // ICONS






const Header = () => {
  const location = useLocation(); // <-- get current 
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // ADD THIS


  // Function to get header content based on route
  const getHeaderContent = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Welcome to your dashboard";
      case "/profile":
        return "Here is your profile";
      case "/application":
        return "Here are your applications";
      case "/jobs":
        return "Here are your jobs";
      case "/rdashboard":
        return "Welcome Employer";
      case "/jobdesc":
        return "Here is your job details";
      default:
        return "";
    }
  };

  return (
    <header className="header-g">
     <div className="header-left-g">
  <button className="hamburger-btn-g" onClick={toggleSidebar}>
    {/* {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />} */}
    <FaBars />
  </button>
  <div className="welcome-text-g">
    <h2>Welcome back, Candidate!</h2>
    <p>{getHeaderContent()}</p>
  </div>
</div>

      <div className="header-right-g">
        <img src={bell} alt="bell" />
        <img src={moon} alt="moon" />
        <Link to="/candidate/profile">
          <img src={profilepic} alt="profile" className="profile-g" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
