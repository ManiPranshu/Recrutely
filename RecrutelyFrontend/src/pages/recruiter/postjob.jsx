import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./postjob.css";

const PostJob = () => {
  const [selectedType, setSelectedType] = useState("Remote"); // default selected
  const [selectedJobType, setSelectedJobType] = useState("Full-Time");

  const optionsMode = ["Remote", "Hybrid", "Onsite"];
  const opetionsType = ["Full-Time", "Part-Time", "Contract", "Internship"];

  return (
    <>
      <div className="rp-heading-profile">
        <h2>Post a new job</h2>
        <p>Fill out the job details below to create a new listing.</p>
      </div>

      <div className="rp-job-post-form">
        <label htmlFor="title" className="rp-post-job-label">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          className="rp-post-job-input"
          placeholder="e.g. Senior Frontend Developer"
        />

        <span className="rp-post-job-label">Work Mode</span>
        <div className="rp-btn-group">
          {optionsMode.map((type) => (
            <button
              key={type}
              className={`rp-type-btn ${selectedType === type ? "rp-active" : ""}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <span className="rp-post-job-label">Job Type</span>
        <div className="rp-btn-group">
          {opetionsType.map((type) => (
            <button
              key={type}
              className={`rp-type-btn ${selectedJobType === type ? "rp-active" : ""}`}
              onClick={() => setSelectedJobType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <span className="rp-post-job-label">Salary Range</span>
        <div className="rp-salary-input-form">
          <input
            type="text"
            placeholder="Min (e.g. 80000) "
            className="rp-min-salary"
          />
          <span style={{ color: "#B2ABAB" }}>-</span>
          <input
            type="text"
            placeholder="Max (e.g. 80000) "
            className="rp-max-salary"
          />
        </div>

        <label htmlFor="location" className="rp-post-job-label">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="rp-post-job-input"
          placeholder="e.g. NY"
        />

        <span
          style={{ fontSize: "1.125", fontWeight: "200", marginTop: "1em" }}
        >
          Job Description
        </span>
        <label htmlFor="respon" className="rp-post-job-label">
          Responsibilities
        </label>
        <textarea
          type="text"
          id="respon"
          className="rp-post-job-discript"
          placeholder="List key responsibilities and duties..."
        ></textarea>

        <label htmlFor="rskills" className="rp-post-job-label">
          Required Skills
        </label>
        <textarea
          type="text"
          id="rskills"
          className="rp-post-job-discript"
          placeholder="List required skills and qualifications..."
        ></textarea>

        <label htmlFor="perks" className="rp-post-job-label">
          Perks & Benefits
        </label>
        <textarea
          type="text"
          id="perks"
          className="rp-post-job-discript"
          placeholder="List company perks and benefits..."
        ></textarea>

        <div className="rp-form-buttons">
          <button className="rp-btn rp-reset-btn">Reset</button>
          <button className="rp-btn rp-post-btn">
            <FaPaperPlane /> Post Job
          </button>
        </div>
      </div>
    </>
  );
};

export default PostJob;
