// import React, { useEffect, useState } from "react";
// import "./Application.css";
// import resumeIcon from "/assets/bell.png"; // Replace with your actual icon path
// import axios from "axios";

// const Applications = () => {
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
//       <h2 className="applications-title">Applications</h2>
//       <p className="applications-subtitle">
//         Track the progress of your job applications
//       </p>

//       <h3 className="history-heading">Application History</h3>

//       {applications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         <table className="applications-table">
//           <thead>
//             <tr>
//               <th>JOB</th>
//               <th>COMPANY</th>
//               <th>APPLIED ON</th>
//               <th>STATUS</th>
//               <th>RESUME</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applications.map((app, index) => (
//               <tr key={index}>
//                 <td data-label="Job" className="job-cell">{app.job_title}</td>
//       <td data-label="Company">{app.company}</td>
//       <td data-label="Applied On">{new Date(app.applied_on || app.applied_at).toLocaleDateString()}</td>
//       <td data-label="Status">
//         <span className={getStatusClass(app.status)}>
//           {app.status}
//         </span>
//       </td>
//                 <td data-label="Resume">
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
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Applications;
import React, { useEffect, useState } from "react";
import "./Application.css";
import { FaEye } from "react-icons/fa"; // Using react-icons for consistency
import axios from "axios";

const Applications = () => {
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
        const res = await axios.get(`http://localhost:3000/api/applications/${userId}`);
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
      <div className="applications-header">
        <h1 className="applications-title">Applications</h1>
        <p className="applications-subtitle">
          Track the progress of your job applications.
        </p>
      </div>

      <div className="history-panel">
        <h2 className="history-heading">Application History</h2>

        {loading ? (
          <div className="message-box">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="message-box">You haven't applied to any jobs yet.</div>
        ) : (
          <div className="table-wrapper">
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

export default Applications;