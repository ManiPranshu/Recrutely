import React, { useState } from "react";
import './MainContent.css'; 
import companyLogo from "/assets/moon.png";
import Applications from "./Application.jsx"; 
import ApplyModal from "./ApplyModal.jsx";




import docIcon from "/assets/application.png";         // Replace with actual path to blue document icon
import rejectedIcon from "/assets/totaljob.png"; // Replace with red X icon
import shortlistedIcon from "/assets/shortlist.png"; // Replace with green check icon
import ProfilePage from "./ProfilePage.jsx";
import {Link} from "react-router-dom";



const ApplicationStats = () => {
  const stats = [
    {
      label: "Total Applications",
      count: 24,
      icon: docIcon,
    },
    {
      label: "Rejected",
      count: 7,
      icon: rejectedIcon,
    },
    {
      label: "Shortlisted",
      count: 3,
      icon: shortlistedIcon,
    },
  ];

  return (
    <div className="application-stats-container">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-content">
            <img src={stat.icon} alt={stat.label} className="stat-icon" />
            <div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-count">{stat.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};







const Joblist = () => {




  return (

      <div className="job-row">
        <div className="job-carde">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
          <Link to="/jobdesc">
          <button className="apply-button" >Apply Now</button>
          </Link>
          
        </div>
       

        <div className="job-carde">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
<Link to="/jobdesc">
          <button className="apply-button" >Apply Now</button>
          </Link>
        </div>

        <div className="job-carde">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
<Link to="/jobdesc">
          <button className="apply-button" >Apply Now</button>
          </Link>
        </div>


        <div className="job-carde">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
<Link to="/jobdesc">
          <button className="apply-button" >Apply Now</button>
          </Link>
        </div>


        <div className="job-carde">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
<Link to="/jobdesc">
          <button className="apply-button" >Apply Now</button>
          </Link>
        </div>


        <div className="job-carde">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
<Link to="/jobdesc">
          <button className="apply-button" >Apply Now</button>
          </Link>
        </div>
      </div>

  );
};

const MainContent = () => {
  return (
    <div className="main-content">

      

      <ApplicationStats />
      <Joblist />
       <Applications />



      
      <div style={{ height: "auto" }}></div>
    </div>
  );
};

export default MainContent;
