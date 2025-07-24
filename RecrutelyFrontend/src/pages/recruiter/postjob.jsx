import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./postjob.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useParams } from "react-router-dom";
import { useEffect } from "react";


const PostJob = () => {
  const [selectedType, setSelectedType] = useState("Remote");
  const [selectedJobType, setSelectedJobType] = useState("Full-Time");
  const [title, setTitle] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [location, setLocation] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [skills, setSkills] = useState("");
  const [perks, setPerks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const optionsMode = ["Remote", "Hybrid", "Onsite"];
  const optionsType = ["Full-Time", "Part-Time", "Contract", "Internship"];

  const { id } = useParams(); // Will be undefined for new job, or have job ID
  const isEditMode = Boolean(id);
  


  useEffect(() => {
  const fetchJobDetails = async () => {
    if (!id) return;


    try {
      const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
      const data = await res.json();

      if (data.success) {
        const job = data.job;
        setTitle(job.title || "");
        setSelectedType(job.work_mode || "Remote");
        setSelectedJobType(job.job_type || "Full-Time");
        setMinSalary(job.salary_min || "");
        setMaxSalary(job.salary_max || "");
        setLocation(job.location || "");
        setResponsibilities(job.responsibilities || "");
        setSkills(job.skills || "");
        setPerks(job.perks || "");
      } else {
        toast.error("Failed to load job data.");
      }
    } catch (error) {
      toast.error("Error loading job.");
    }
  };

  fetchJobDetails();
}, [id]);


  

  const resetForm = () => {
    setSelectedType("Remote");
    setSelectedJobType("Full-Time");
    setTitle("");
    setMinSalary("");
    setMaxSalary("");
    setLocation("");
    setResponsibilities("");
    setSkills("");
    setPerks("");
  };

  

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const jobData = {
    title,
    company: "Recrutely",
    workMode: selectedType,
    jobType: selectedJobType,
    salaryMin: Number(minSalary),
    salaryMax: Number(maxSalary),
    location,
    responsibilities,
    skills,
    perks,
  };

  try {
    const url = id
      ? `http://localhost:3000/api/jobs/${id}` // If editing
      : "http://localhost:3000/api/jobs/post-job"; // If creating

    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success(id ? "Job updated successfully!" : "🎉 Job posted!");
       if(!id) resetForm(); // Clear form only for new job
    } else {
      toast.error(result?.error || "Something went wrong.");
    }
  } catch (err) {
    toast.error("Server error. Please try again.");
    console.error(err);
  } finally {
    setIsSubmitting(false);
  }
};

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <span className="rp-post-job-label">Work Mode</span>
        <div className="rp-btn-group">
          {optionsMode.map((type) => (
            <button
              key={type}
              className={`rp-type-btn ${
                selectedType === type ? "rp-active" : ""
              }`}
              onClick={() => setSelectedType(type)}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>

        <span className="rp-post-job-label">Job Type</span>
        <div className="rp-btn-group">
          {optionsType.map((type) => (
            <button
              key={type}
              className={`rp-type-btn ${
                selectedJobType === type ? "rp-active" : ""
              }`}
              onClick={() => setSelectedJobType(type)}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>

        <span className="rp-post-job-label">Salary Range</span>
        <div className="rp-salary-input-form">
          <input
            type="text"
            placeholder="Min (e.g. 80000)"
            className="rp-min-salary"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
          />
          <span style={{ color: "#B2ABAB" }}>-</span>
          <input
            type="text"
            placeholder="Max (e.g. 100000)"
            className="rp-max-salary"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
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
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label htmlFor="respon" className="rp-post-job-label">
          Responsibilities
        </label>
        <textarea
          id="respon"
          className="rp-post-job-discript"
          placeholder="List key responsibilities and duties..."
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
        ></textarea>

        <label htmlFor="rskills" className="rp-post-job-label">
          Required Skills
        </label>
        <textarea
          id="rskills"
          className="rp-post-job-discript"
          placeholder="List required skills and qualifications..."
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        ></textarea>

        <label htmlFor="perks" className="rp-post-job-label">
          Perks & Benefits
        </label>
        <textarea
          id="perks"
          className="rp-post-job-discript"
          placeholder="List company perks and benefits..."
          value={perks}
          onChange={(e) => setPerks(e.target.value)}
        ></textarea>

        <div className="rp-form-buttons">
          <button
            className="rp-btn rp-reset-btn"
            type="button"
            onClick={resetForm}
          >
            Reset
          </button>

          <button
            className="rp-btn rp-post-btn"
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Posting..."
            ) : (
              <>
                <FaPaperPlane /> 
               {isEditMode ? "Update Job" : "Post Job"}
              </>
            )}
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default PostJob;
