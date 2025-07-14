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
      <div className="heading-profile">
        <h2>Post a new job</h2>
        <p>Fill out the job details below to create a new listing.</p>
      </div>

      <div className="job-post-form">
        <label htmlFor="title" className="post-job-label">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          className="post-job-input"
          placeholder="e.g. Senior Frontend Developer"
        />

        <span className="post-job-label">Work Mode</span>
        <div className="btn-group">
          {optionsMode.map((type) => (
            <button
              key={type}
              className={`type-btn ${selectedType === type ? "active" : ""}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <span className="post-job-label">Job Type</span>
        <div className="btn-group">
          {opetionsType.map((type) => (
            <button
              key={type}
              className={`type-btn ${selectedJobType === type ? "active" : ""}`}
              onClick={() => setSelectedJobType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <span className="post-job-label">Salary Range</span>
        <div className="salary-input-form">
          <input
            type="text"
            placeholder="Min (e.g. 80000) "
            className="min-salary"
          />
          <span style={{ color: "#B2ABAB" }}>-</span>
          <input
            type="text"
            placeholder="Max (e.g. 80000) "
            className="max-salary"
          />
        </div>

        <label htmlFor="location" className="post-job-label">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="post-job-input"
          placeholder="e.g. NY"
        />

        <span
          style={{ fontSize: "1.125", fontWeight: "200", marginTop: "1em" }}
        >
          Job Description
        </span>
        <label htmlFor="respon" className="post-job-label">
          Responsibilities
        </label>
        <textarea
          type="text"
          id="respon"
          className="post-job-discript"
          placeholder="List key responsibilities and duties..."
        ></textarea>

        <label htmlFor="rskills" className="post-job-label">
          Required Skills
        </label>
        <textarea
          type="text"
          id="rskills"
          className="post-job-discript"
          placeholder="List required skills and qualifications..."
        ></textarea>

        <label htmlFor="perks" className="post-job-label">
          Perks & Benefits
        </label>
        <textarea
          type="text"
          id="perks"
          className="post-job-discript"
          placeholder="List company perks and benefits..."
        ></textarea>

        <div className="form-buttons">
          <button className="btn reset-btn">Reset</button>
          <button className="btn post-btn">
            <FaPaperPlane /> Post Job
          </button>
        </div>
      </div>
    </>
  );
};

export default PostJob;
