import React, { useState, useEffect } from "react";
import "./ViewApplicants.css";
import { FaEye, FaDownload } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const rowsPerPage = 5;

function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const { jobId } = useParams(); // if using react-router with dynamic jobId
  const job_id = jobId; // fallback if jobId is not dynamic

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/applicants/${job_id}`
        );
        if (res.data.success) {
          const formatted = res.data.applicants.map((a) => ({
            name: a.user_name,
            email: a.email,
            skills: Array.isArray(a.skills) ? a.skills.filter(Boolean) : [],
            experience: calculateExperience(
              a.experience_start,
              a.experience_end
            ),
            resume: a.resume_url,
            status: a.status,
          }));
          console.log("Formatted applicants:", formatted);
          setApplicants(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch applicants", err);
      }
    };

    fetchApplicants();
  }, [job_id]);

  const calculateExperience = (start, end) => {
  if (!start || !end) return "N/A";
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "N/A";

  const diff = endDate - startDate;
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.4));
  return `${years} year(s) ${months} month(s)`;
};


  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = applicant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "" || applicant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredApplicants.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentApplicants = filteredApplicants.slice(startIndex, endIndex);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="view-container">
      <Link to="/">
        <button className="back-button">← Back to Job Listings</button>
      </Link>

      <div className="header-row">
        <div className="heading-text">
          <h1>Applicants for Job #{job_id}</h1>
          <p>Total: {filteredApplicants.length} applicants</p>
        </div>

        <div className="search-status">
          <input
            type="text"
            className="search-bar"
            placeholder="🔍 Search Applicants ..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="status-filter"
            value={filterStatus}
            onChange={(e) => {
              const selected = e.target.value;
              setFilterStatus(selected === "All Status" ? "" : selected);
              setCurrentPage(1);
            }}
          >
            <option>All Status</option>
            <option>Applied</option>
            <option>Shortlisted</option>
            <option>Interview</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div class="applicants-table-container">

      
      <table className="applicants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
       <tbody>
  {currentApplicants.map((applicant, index) => (
    <tr className="applicant-row" key={index}>
      <td data-label="Name">
        <strong>{applicant.name}</strong>
        <br />
        {/* <span className="email">{applicant.email}</span> */}
      </td>
      <td data-label="Skills">
        {applicant.skills.map((skill, idx) => (
          <span key={idx} className="pill">
            {skill}
          </span>
        ))}
      </td>
      <td data-label="Experience">{applicant.experience}</td>
      <td data-label="Resume" className="resume-icons">
        <a
          href={applicant.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEye className="icon" />
        </a>
        <a href={applicant.resume} download>
          <FaDownload className="icon" />
        </a>
      </td>
      <td data-label="Status">
        <span className={`status ${applicant.status.toLowerCase()}`}>
          {applicant.status}
        </span>
      </td>
      <td data-label="Actions" className="actions">
        <button className="shortlist">✓ Shortlist</button>
        <button className="interview">📅 Interview</button>
        <button className="reject">✘ Reject</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>
          Showing {startIndex + 1}-
          {Math.min(endIndex, filteredApplicants.length)} of{" "}
          {filteredApplicants.length} applicants
        </span>
        <div className="pagination-buttons">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
            )
            .map((p, i) => (
              <button
                key={i}
                className={currentPage === p ? "active" : ""}
                onClick={() => changePage(p)}
              >
                {p}
              </button>
            ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewApplicants;
