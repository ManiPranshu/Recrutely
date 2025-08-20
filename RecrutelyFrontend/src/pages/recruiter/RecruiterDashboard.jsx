// import React from "react";
// import "./RecruiterDashboard.css";
// import { FaBriefcase, FaUser, FaCalendarAlt, FaEye } from "react-icons/fa";
// import { useState } from "react";
// import { useEffect } from "react";

// const shortlists = [
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   {
//     name: "Abhijeet kumar",
//     email: "abhijeet@example.com",
//     role: "Frontend Developer",
//     location: "San Francisco, Remote",
//     applied: "3 Days ago",
//     status: "Pending",
//     resume: "#",
//   },
//   // Add more shortlists as needed
// ];

// export default function RecruiterDashboard() {
//   const [dashboardStats, setDashboardStats] = useState({
//     totalJobs: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5050/api/jobs/dashboard-stats"
//         );
//         const data = await res.json();

//         if (data.success) {
//           setDashboardStats(data.stats);
//         }
//       } catch (error) {
//         console.error("Failed to fetch dashboard stats:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   const stats = [
//     {
//       icon: <FaBriefcase />,
//       label: "Total Jobs",
//       value: dashboardStats.totalJobs,
//       sub: "4 new\nAcross all jobs",
//     },
//     {
//       icon: <FaUser />,
//       label: "Applicants",
//       value: 7,
//       sub: "4 new\nAcross all jobs",
//     },
//     {
//       icon: <FaCalendarAlt />,
//       label: "Pending Interview",
//       value: 3,
//       sub: "This Week\n5 scheduled, 3 to confirm",
//     },
//   ];

//   const interviews = [
//     {
//       name: "Abhijeet Kumar",
//       role: "Backend Developer",
//       type: "Technical",
//       time: "Today, 2:00 PM - 3:00 PM",
//       meet: "Google Meet",
//       meetLink: "https://meet.google.com/landing",
//       avatar: "https://ui-avatars.com/api/?name=Abhijeet+Kumar",
//     },
//     {
//       name: "Abhijeet Kumar",
//       role: "Backend Developer",
//       type: "Technical",
//       time: "Today, 2:00 PM - 3:00 PM",
//       meet: "Google Meet",
//       meetLink: "https://meet.google.com/landing",
//       avatar: "https://ui-avatars.com/api/?name=Abhijeet+Kumar",
//     },
//     {
//       name: "Abhijeet Kumar",
//       role: "Backend Developer",
//       type: "Technical",
//       time: "Today, 2:00 PM - 3:00 PM",
//       meet: "Google Meet",
//       meetLink: "https://meet.google.com/landing",
//       avatar: "https://ui-avatars.com/api/?name=Abhijeet+Kumar",
//     },
//     {
//       name: "Abhijeet Kumar",
//       role: "Backend Developer",
//       type: "Technical",
//       time: "Today, 2:00 PM - 3:00 PM",
//       meet: "Google Meet",
//       meetLink: "https://meet.google.com/landing",
//       avatar: "https://ui-avatars.com/api/?name=Abhijeet+Kumar",
//     },
//     // Add more interviews as needed
//   ];
//   const [showAllShortlists, setShowAllShortlists] = useState(false);
//   const shortlistRowsToShow = 2;

//   const displayedShortlists = showAllShortlists
//     ? shortlists
//     : shortlists.slice(0, shortlistRowsToShow);

//   return (
//     <div className="recruiter-dashboard">
//       {/* Stats */}
//       <div className="stats-row">
//         {stats.map((stat, i) => (
//           <div className="stat-card" key={i}>
//             <div className="stat-icon">{stat.icon}</div>
//             <div>
//               <div className="stat-value">{stat.value}</div>
//               <div className="stat-label">{stat.label}</div>
//               <div className="stat-sub">{stat.sub}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Upcoming Interviews */}
//       <div className="section">
//         <div className="section-header">
//           <h2>Upcoming Interviews</h2>
//           <a href="#" className="view-link">
//             View Tracker &gt;
//           </a>
//         </div>
//         <div className="interviews-row">
//           {interviews.map((iv, i) => (
//             <div className="interview-card" key={i}>
//               <div className="interview-header">
//                 <img src={iv.avatar} alt={iv.name} className="avatar" />
//                 <div>
//                   <div className="candidate-name">{iv.name}</div>
//                   <div className="candidate-role">{iv.role}</div>
//                 </div>
//                 <span className="interview-type">{iv.type}</span>
//               </div>
//               <div className="interview-details">
//                 <div>{iv.time}</div>
//                 <div>
//                   <span role="img" aria-label="meet">
//                     📅
//                   </span>{" "}
//                   {iv.meet}{" "}
//                   <a href={iv.meetLink} className="join-link">
//                     Join
//                   </a>
//                 </div>
//               </div>
//               <div className="interview-actions">
//                 <button className="btn-outline">Reschedule</button>
//                 <button className="btn-primary">View Details</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recent Shortlists */}
//       <div className="section">
//         <div className="section-header">
//           <h2>Recent Shortlists</h2>
//           <button
//             className="view-link"
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               padding: 0,
//             }}
//             onClick={() => setShowAllShortlists((prev) => !prev)}
//           >
//             {showAllShortlists ? "Show Less" : "View All >"}
//           </button>
//         </div>
//         <table className="shortlist-table">
//           <thead>
//             <tr>
//               <th>CANDIDATE</th>
//               <th>JOB ROLE</th>
//               <th>APPLIED</th>
//               <th>STATUS</th>
//               <th>RESUME</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedShortlists.map((s, i) => (
//               <tr key={i}>
//                 <td>
//                   <div className="candidate-name">{s.name}</div>
//                   <div className="candidate-email">{s.email}</div>
//                 </td>
//                 <td>
//                   {s.role}
//                   <div className="candidate-location">{s.location}</div>
//                 </td>
//                 <td>{s.applied}</td>
//                 <td>
//                   <span className="status-pill">{s.status}</span>
//                 </td>
//                 <td>
//                   <a href={s.resume} className="resume-link">
//                     <FaEye /> View
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React from "react";
import "./RecruiterDashboard.css";
import { FaBriefcase, FaUser, FaCalendarAlt, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

const shortlists = [
  {
    id: 1, // Added unique ID for a better key
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    id: 2,
    name: "Abhijeet kumar",
    email: "abhijeet@example.com",
    role: "Frontend Developer",
    location: "San Francisco, Remote",
    applied: "3 Days ago",
    status: "Pending",
    resume: "#",
  },
  {
    id: 3,
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
  const [dashboardStats, setDashboardStats] = useState({
    totalJobs: 22, // Set initial value from screenshot
  });

  // useEffect for fetching data is good, keeping it as is.
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/jobs/dashboard-stats"
        );
        const data = await res.json();

        if (data.success) {
          setDashboardStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    // fetchStats(); // You can re-enable this
  }, []);

  const stats = [
    {
      icon: <FaBriefcase />,
      label: "Total Jobs",
      value: dashboardStats.totalJobs,
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
      id: 1, // Added unique ID for a better key
      name: "Abhijeet Kumar",
      role: "Backend Developer",
      type: "Technical",
      time: "Today, 2:00 PM - 3:00 PM",
      meet: "Google Meet",
      meetLink: "#",
      avatar: "AK",
    },
    {
      id: 2,
      name: "Abhijeet Kumar",
      role: "Backend Developer",
      type: "Technical",
      time: "Today, 2:00 PM - 3:00 PM",
      meet: "Google Meet",
      meetLink: "#",
      avatar: "AK",
    },
    {
      id: 3,
      name: "Abhijeet Kumar",
      role: "Backend Developer",
      type: "Technical",
      time: "Today, 2:00 PM - 3:00 PM",
      meet: "Google Meet",
      meetLink: "#",
      avatar: "AK",
    },
  ];
  const [showAllShortlists, setShowAllShortlists] = useState(false);
  const shortlistRowsToShow = 2;

  const displayedShortlists = showAllShortlists
    ? shortlists
    : shortlists.slice(0, shortlistRowsToShow);

  return (
    <div className="recruiter-dashboard">
      {/* Welcome Header can be added if needed */}
      {/* <h1>Welcome back, Employer!</h1> */}
      
      {/* Stats */}
      <div className="stats-row">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
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
          <a href="#" className="view-link">
            View Tracker &gt;
          </a>
        </div>
        <div className="interviews-row">
          {interviews.map((iv) => (
            <div className="interview-card" key={iv.id}>
              <div className="interview-header">
                <div className="avatar">{iv.avatar}</div>
                <div>
                  <div className="candidate-name">{iv.name}</div>
                  <div className="candidate-role">{iv.role}</div>
                </div>
                <span className="interview-type">{iv.type}</span>
              </div>
              <div className="interview-details">
                <p>{iv.time}</p>
                <p>
                  <span role="img" aria-label="meet">
                    📅
                  </span>{" "}
                  {iv.meet}{" "}
                  <a href={iv.meetLink} className="join-link">
                    Join
                  </a>
                </p>
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
            onClick={() => setShowAllShortlists((prev) => !prev)}
          >
            {showAllShortlists ? "Show Less" : "View All >"}
          </button>
        </div>
        <div className="table-container">
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
              {displayedShortlists.map((s) => (
                <tr key={s.id}>
                  <td data-label="Candidate">
                    <div className="candidate-name">{s.name}</div>
                    <div className="candidate-email">{s.email}</div>
                  </td>
                  <td data-label="Job Role">
                    {s.role}
                    <div className="candidate-location">{s.location}</div>
                  </td>
                  <td data-label="Applied">{s.applied}</td>
                  <td data-label="Status">
                    <span className="status-pill">{s.status}</span>
                  </td>
                  <td data-label="Resume">
                    <a href={s.resume} className="resume-link">
                      <FaEye /> View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}