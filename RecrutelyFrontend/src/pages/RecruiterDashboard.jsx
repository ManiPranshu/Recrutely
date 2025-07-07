import React from "react";
import "./RecruiterDashboard.css";
import { FaBriefcase, FaUser, FaCalendarAlt, FaEye } from "react-icons/fa";
import {useState} from "react";

const stats = [
  {
    icon: <FaBriefcase />,
    label: "Total Jobs",
    value: 7,
    sub: "4 new\nAcross all jobs",
  },
  {
    icon: <FaUser />,
    label: "Applicants",
    value: 7,
    sub: "4 new\nAcross all jobs",
  },
  {
    icon: <FaCalendarAlt />,
    label: "Pending Interview",
    value: 3,
    sub: "This Week\n5 scheduled, 3 to confirm",
  },
];

const interviews = [
  {
    name: "Abhijeet Kumar",
    role: "Backend Developer",
    type: "Technical",
    time: "Today, 2:00 PM - 3:00 PM",
    meet: "Google Meet",
    meetLink: "https://meet.google.com/landing",
    avatar: "https://ui-avatars.com/api/?name=Abhijeet+Kumar",
  },
    {
    name: "Abhijeet Kumar",
    role: "Backend Developer",
    type: "Technical",
    time: "Today, 2:00 PM - 3:00 PM",
    meet: "Google Meet",
    meetLink: "https://meet.google.com/landing",
    avatar: "https://ui-avatars.com/api/?name=Abhijeet+Kumar",
  },
    {
    name: "Abhijeet Kumar",
    role: "Backend Developer",
    type: "Technical",
    time: "Today, 2:00 PM - 3:00 PM",
    meet: "Google Meet",
    meetLink: "https://meet.google.com/landing",
    avatar: "https://ui-avatars.com/api/?name=Abhijeet+Kumar",
  },
    {
    name: "Abhijeet Kumar",
    role: "Backend Developer",
    type: "Technical",
    time: "Today, 2:00 PM - 3:00 PM",
    meet: "Google Meet",
    meetLink: "https://meet.google.com/landing",
    avatar: "https://ui-avatars.com/api/?name=Abhijeet+Kumar",
  }
  // Add more interviews as needed
];

const shortlists = [
  {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
   {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
   {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
   {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  // Add more shortlists as needed
];

export default function RecruiterDashboard() {
    const [showAllShortlists, setShowAllShortlists] = useState(false);
    const shortlistRowsToShow = 2;

    const displayedShortlists = showAllShortlists
    ? shortlists
    : shortlists.slice(0, shortlistRowsToShow);


    
  return (
    <div className="recruiter-dashboard">
      {/* Stats */}
      <div className="stats-row">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon">{stat.icon}</div>
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Interviews */}
      <div className="section">
        <div className="section-header">
          <h2>Upcoming Interviews</h2>
          <a href="#" className="view-link">View Tracker &gt;</a>
        </div>
        <div className="interviews-row">
          {interviews.map((iv, i) => (
            <div className="interview-card" key={i}>
              <div className="interview-header">
                <img src={iv.avatar} alt={iv.name} className="avatar" />
                <div>
                  <div className="candidate-name">{iv.name}</div>
                  <div className="candidate-role">{iv.role}</div>
                </div>
                <span className="interview-type">{iv.type}</span>
              </div>
              <div className="interview-details">
                <div>{iv.time}</div>
                <div>
                  <span role="img" aria-label="meet">📅</span> {iv.meet} <a href={iv.meetLink} className="join-link">Join</a>
                </div>
              </div>
              <div className="interview-actions">
                <button className="btn-outline">Reschedule</button>
                <button className="btn-primary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Shortlists */}
     <div className="section">
        <div className="section-header">
          <h2>Recent Shortlists</h2>
          <button
            className="view-link"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            onClick={() => setShowAllShortlists((prev) => !prev)}
          >
            {showAllShortlists ? "Show Less" : "View All >"}
          </button>
        </div>
        <table className="shortlist-table">
          <thead>
            <tr>
              <th>CANDIDATE</th>
              <th>JOB ROLE</th>
              <th>APPLIED</th>
              <th>STATUS</th>
              <th>RESUME</th>
            </tr>
          </thead>
          <tbody>
            {displayedShortlists.map((s, i) => (
              <tr key={i}>
                <td>
                  <div className="candidate-name">{s.name}</div>
                  <div className="candidate-email">{s.email}</div>
                </td>
                <td>
                  {s.role}
                  <div className="candidate-location">{s.location}</div>
                </td>
                <td>{s.applied}</td>
                <td>
                  <span className="status-pill">{s.status}</span>
                </td>
                <td>
                  <a href={s.resume} className="resume-link"><FaEye /> View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}