import React, { useState } from "react";
import "./ViewApplicants.css";
import { FaEye, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";


const allApplicants = Array.from({ length: 124 }, (_, i) => ({
  name: `Abhijeet Kumar ${i + 1}`,
  email: `abhijeet${i + 1}@email.com`,
  skills: ["Javascript", "Typescript", "React"],
  experience: "5 years",
  status: ["Applied", "Shortlisted", "Interview", "Rejected"][i % 4],
}));

const rowsPerPage = 5;

function ViewApplicants() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredApplicants = allApplicants.filter((applicant) => {
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
      {/* Back Button */}
      <Link to="/">
      <button className="back-button">← Back to Job Listings</button>
      </Link>
      

      {/* Top Heading Section */}
      <div className="header-row">
        <div className="heading-text">
          <h1>Applicants for "Frontend Developer"</h1>
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
    setCurrentPage(1); // Reset to first page
  }}
/>

<select
  className="status-filter"
  value={filterStatus}
  onChange={(e) => {
    const selected = e.target.value;
    setFilterStatus(selected === "All Status" ? "" : selected);
    setCurrentPage(1); // Reset to first page
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
              <td>
                <strong>{applicant.name}</strong>
                <br />
                <span className="email">{applicant.email}</span>
              </td>
              <td>
                {applicant.skills.map((skill, idx) => (
                  <span key={idx} className="pill">
                    {skill}
                  </span>
                ))}
              </td>
              <td>{applicant.experience}</td>
              <td className="resume-icons">
                <FaEye className="icon" />
                <FaDownload className="icon" />
              </td>
              <td>
                <span className={`status ${applicant.status.toLowerCase()}`}>
                  {applicant.status}
                </span>
              </td>
              <td className="actions">
                <button className="shortlist">✓ Shortlist</button>
                <button className="interview">📅 Interview</button>
                <button className="reject">✘ Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <span>
          Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredApplicants.length)} of {filteredApplicants.length} applicants
        </span>
        <div className="pagination-buttons">
  <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
    {"<"}
  </button>
  {currentPage > 2 && (
    <>
      <button
        className={currentPage === 1 ? "active" : ""}
        onClick={() => changePage(1)}
      >
        1
      </button>
      {currentPage > 3 && <span className="pagination-ellipsis">...</span>}
    </>
  )}
  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (p) =>
        p === currentPage ||
        p === currentPage - 1 ||
        p === currentPage + 1
    )
    .map((p) => (
      <button
        key={p}
        className={currentPage === p ? "active" : ""}
        onClick={() => changePage(p)}
      >
        {p}
      </button>
    ))}
  {currentPage < totalPages - 1 && (
    <>
      {currentPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
      <button
        className={currentPage === totalPages ? "active" : ""}
        onClick={() => changePage(totalPages)}
      >
        {totalPages}
      </button>
    </>
  )}
  <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
    {">"}
  </button>
</div>
      </div>
    </div>
  );
}

export default ViewApplicants;
