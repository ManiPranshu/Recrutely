import "./Application.css"; // Ensure the path is correct
import resumeIcon from "/assets/bell.png"; // Replace with your actual icon path





const Applications = () => {
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
      <h2 className="applications-title">Applications</h2>
      <p className="applications-subtitle">
        Track the progress of your job applications
      </p>

      <h3 className="history-heading">Application History</h3>

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

export default Applications;
