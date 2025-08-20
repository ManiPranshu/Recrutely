import React, { useState, useEffect } from "react";
import "./MainContent.css";
import Applications from "./Application";
import "./Application.css"; // Ensure the path is correct
import resumeIcon from "/assets/bell.png"; // Replace with your actual icon path
import { FaEye } from "react-icons/fa";

import docIcon from "/assets/application.png"; // Replace with actual path to blue document icon
import rejectedIcon from "/assets/totaljob.png"; // Replace with red X icon
import shortlistedIcon from "/assets/shortlist.png"; // Replace with green check icon
import { Link } from "react-router-dom";
import axios from "axios";

const ApplicationStats = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/applications/${userId}`
        );
        if (!res.ok) {
          console.error("Fetch failed with status:", res.status);
          return;
        }

        const data = await res.json();
        console.log("Fetched applications:", data);
        setApplications(data); // directly use the array
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchApplications();
    }
  }, [userId]);

  const totalApplications = applications.length;
  const rejectedApplications = applications.filter(
    (app) => app.status === "Rejected"
  ).length;
  const shortlistedApplications = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  const stats = [
    {
      label: "Total Applications",
      count: loading ? "-" : totalApplications,
      icon: docIcon,
    },
    {
      label: "Rejected",
      count: loading ? "-" : rejectedApplications,
      icon: rejectedIcon,
    },
    {
      label: "Shortlisted",
      count: loading ? "-" : shortlistedApplications,
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
        const res = await fetch("http://localhost:5050/api/jobs/listings");
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
            <p>{`$${job.salary_min} - $${job.salary_max}`}</p>
            <Link to={`/candidate/jobdesc/${job.id}`}>
              <button className="apply-button">Apply Now</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

// const Applied = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5050/api/applications/${userId}`
//         );
//         setApplications(res.data);
//       } catch (err) {
//         console.error("Error fetching applications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [userId]);

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Pending":
//       case "Applied":
//         return "status status-pending";
//       case "Rejected":
//         return "status status-rejected";
//       case "Shortlist":
//       case "Shortlisted":
//         return "status status-shortlist";
//       default:
//         return "status";
//     }
//   };

//   if (loading) return <div className="applications-container">Loading...</div>;

//   return (
//     <div className="applications-container">
//       <h3 className="applications-title">Recently Applied</h3>

//       <table className="applications-table">
//         <thead>
//           <tr>
//             <th>JOB</th>
//             <th>COMPANY</th>
//             <th>APPLIED ON</th>
//             <th>STATUS</th>
//             <th>RESUME</th>
//           </tr>
//         </thead>
//         <tbody>
//           {applications
//             .sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at)) // sort by date descending
//             .slice(0, 5) // get the 5 most recent
//             .map((app, index) => (
//               <tr key={index}>
//                 <td className="job-cell">{app.job_title}</td>
//                 <td>{app.company}</td>
//                 <td>
//                   {new Date(
//                     app.applied_on || app.applied_at
//                   ).toLocaleDateString()}
//                 </td>
//                 <td>
//                   <span className={getStatusClass(app.status)}>
//                     {app.status}
//                   </span>
//                 </td>
//                 <td>
//                   {app.resume_url ? (
//                     <a
//                       href={app.resume_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="view-resume"
//                     >
//                       <img
//                         src={resumeIcon}
//                         alt="Resume"
//                         className="resume-icon"
//                       />
//                       View
//                     </a>
//                   ) : (
//                     "N/A"
//                   )}
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
const Applied = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // You would get the user ID from your authentication context or localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/applications/${userId}`);
        // Assuming your API returns an array of objects with a unique 'id'
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase() || 'applied';
    switch (statusLower) {
      case "rejected": return "status-rejected";
      case "shortlisted": return "status-shortlisted";
      default: return "status-applied";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
  }

  return (
    <div className="applications-container">
      

      <div className="history-panel">
        <h3 className="appliction-title">Recently Applied</h3>

        {loading ? (
          <div className="message-box">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="message-box">You haven't applied to any jobs yet.</div>
        ) : (
          <div className="table-wrapper-e">
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
                {applications.map((app) => (
                  <tr key={app.id}> {/* Use unique ID for key */}
                    <td data-label="Job" className="job-cell">{app.job_title}</td>
                    <td data-label="Company">{app.company}</td>
                    <td data-label="Applied On">{formatDate(app.applied_on || app.applied_at)}</td>
                    <td data-label="Status">
                      <span className={`status-pill ${getStatusClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td data-label="Resume">
                      {app.resume_url ? (
                        <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="view-resume">
                          <FaEye /> View
                        </a>
                      ) : ("N/A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
