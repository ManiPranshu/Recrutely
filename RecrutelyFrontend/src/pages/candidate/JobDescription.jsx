import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./JobDescription.css";
import companyLogo from "/assets/google.png"; // Placeholder logo
import ApplyModal from "../../components/ApplyModal";

export default function JobDescription() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showResumePopup, setShowResumePopup] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
        const data = await res.json();
        if (data.success) setJob(data.job);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <div>Loading job details...</div>;

  return (
    <div className="job-details-container">
      {/* Header */}
      <div className="job-header-box">
        <div>
          <h2 className="job-title"><h3>{job.title}</h3></h2>
          <p className="company-name">{job.company}</p>
          <div className="job-tags">
            <span>{job.work_mode}</span>
            <span>{job.job_type}</span>
            <span>
              ${job.salary_min}–{job.salary_max}
            </span>
            <span>Posted {new Date(job.posted_at).toDateString()}</span>
          </div>
        </div>
      </div>

      {/* Content Box */}
      <div className="job-content-row">
        {/* Left Box - Job Description */}
        <div className="job-description-box">
          <h3>Job Description</h3>

          <h4>Responsibilities</h4>
          <ul>
            {job.responsibilities
              .split(".")
              .map((item, i) =>
                item.trim() ? <li key={i}>{item.trim()}</li> : null
              )}
          </ul>

          <h4>Required Skills</h4>
          <ul>
            {job.skills.split(",").map((skill, i) => (
              <li key={i}>{skill.trim()}</li>
            ))}
          </ul>

          <h4>Perks & Benefits</h4>
          <ul>
            {job.perks
              .split(".")
              .map((perk, i) =>
                perk.trim() ? <li key={i}>{perk.trim()}</li> : null
              )}
          </ul>
        </div>

       

        {/* Right Box - Company Info */}
        <div className="company-info-box">
          <img src={companyLogo} alt="Google Inc." className="company-logo" />
          <h3 className="company-name">{job.company}</h3>
          <p>
            <strong>Industry:</strong> Technology
          </p>
          <p>
            <strong>Company Size:</strong> 10,000+ Employees
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Work Mode:</strong> {job.work_mode}
          </p>
          <button className="visit-button">Visit Website</button>
          <h4>About Company</h4>
          <p className="about-text">
            Google is a multinational technology company that specializes in
            Internet-related services and products, including online
            advertising, search engines, cloud computing, and software.
          </p>
        </div>
      </div>

      {/* Button Row */}
      <div className="button-row">
        <button className="apply-btn" onClick={() => setShowResumePopup(true)}>
          Apply Now
        </button>
        <button className="save-btn1">💾 Save Job</button>
        <button className="share-btn">📤</button>
      </div>

      {showResumePopup && (
        <ApplyModal onClose={() => setShowResumePopup(false)} />
      )}
    </div>
  );
}
