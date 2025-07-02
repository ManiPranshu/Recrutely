import React from 'react';
import bell from '/assets/bell.png';
import moon from '/assets/moon.png';
import profilepic from '/assets/profilepic.png';
import menu from "/assets/menu.png";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={toggleSidebar}>
            <img src={menu} alt="Menu" />
          </button>
        <div className="welcome-text">
          <h2>Welcome back, Candidate!</h2>
          <p>Here is your job details</p>
        </div>
      </div>
      <div className="header-right">
        <img src={bell} alt="bell" />
        <img src={moon} alt="moon" />
        <img src={profilepic} alt="profile" className="profile" />
      </div>
    </header>
  );
};

export default Header;
