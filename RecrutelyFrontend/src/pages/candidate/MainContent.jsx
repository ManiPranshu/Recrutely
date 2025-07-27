import React, { useState,useEffect } from "react";
import './MainContent.css'; 


import "./Application.css"; 
import resumeIcon from "/assets/bell.png"; 




import docIcon from "/assets/application.png";        
import rejectedIcon from "/assets/totaljob.png"; 
import shortlistedIcon from "/assets/shortlist.png"; 
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
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/jobs/listings");
        const data = await res.json();
        if (data.success) {
          setJobs(data.jobs);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <div className="recommended-text">
        <h3>Recommended Jobs for you</h3>
      </div>

      <div className="job-row">
        {jobs.map((job) => (
          <div className="job-carde" key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>
              {`$${job.salary_min} - $${job.salary_max}`}
            </p>
            <Link to={`/candidate/jobdesc/${job.id}`}>
              <button className="apply-button">Apply Now</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

const Applied = () => {
  const applications = [
    {
      job: "Senior React Developer",
      company: "Microsoft",
      date: "May 22,2023",
      status: "Pending",
    },
    {
      job: "UX Designer",
      company: "Apple Inc.",
      date: "May 22,2023",
      status: "Rejected",
    },
    {
      job: "Frontend Engineer",
      company: "Netflix",
      date: "May 22,2023",
      status: "Pending",
    },
    {
      job: "Full Stack Developer",
      company: "Facebook",
      date: "May 22,2023",
      status: "Shortlist",
    },
    {
      job: "Product Manager",
      company: "Adobe",
      date: "May 22,2023",
      status: "Pending",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status status-pending";
      case "Rejected":
        return "status status-rejected";
      case "Shortlist":
        return "status status-shortlist";
      default:
        return "status";
    }
  };

  return (
    <div className="applications-container">
      <h3 className="applications-title">Recently Applied</h3>
      



      <table className="applications-table">
        <thead>
          <tr>
            <th>JOB</th>
            <th>COMPANY</th>
            <th>APPLIED ON</th>
            <th>STATUS</th>
            <th>RESUME</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td className="job-cell">{app.job}</td>
              <td>{app.company}</td>
              <td>{app.date}</td>
              <td>
                <span className={getStatusClass(app.status)}>
                  {app.status}
                </span>
              </td>
              <td>
                <a href="#" className="view-resume">
                  <img src={resumeIcon} alt="Resume" className="resume-icon" />
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="main-content">

      

      <ApplicationStats />
      <Joblist />
       <Applied />



      
      <div style={{ height: "auto" }}></div>
    </div>
  );
};

export default MainContent;
