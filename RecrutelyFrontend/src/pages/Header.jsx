import React from "react";
import bell from "/assets/bell.png";
import moon from "/assets/moon.png";
import profilepic from "/assets/unnamed.png";
import menu from "/assets/menu.png";
import "./Header.css"; 
import { Link } from "react-router-dom";




const Header = () => {

  return (
    <header className="header">
      <div className="header-left">
       
        <div className="welcome-text">
          <h2>Welcome back, Candidate!</h2>
          <p>Here is your job details</p>
        </div>
      </div>
      <div className="header-right">
        <img src={bell} alt="bell" />
        <img src={moon} alt="moon" />
        <Link to="/profile">
          <img src={profilepic} alt="profile" className="profile" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
