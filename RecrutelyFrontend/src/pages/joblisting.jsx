import { Link } from "react-router-dom";
import "./joblisting.css";
import JobCard from "../components/JobCard";
import { useState } from "react";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google Inc.",
    location: "Remote / Bengaluru",
    salary: "$80k-$120k",
    date: "June 10, 2025",
    applicants: "24",
    status: "Active",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Amazon",
    location: "Remote / Hyderabad",
    salary: "$90k-$130k",
    date: "June 5, 2025",
    applicants: "18",
    status: "Active",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Bengaluru",
    salary: "$70k-$100k",
    date: "May 30, 2025",
    applicants: "32",
    status: "Closed",
  },
  {
    id: 4,
    title: "Full Stack Engineer",
    company: "Microsoft",
    location: "Remote",
    salary: "$100k-$140k",
    date: "June 1, 2025",
    applicants: "45",
    status: "Active",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "Google Inc.",
    location: "Remote / Bengaluru",
    salary: "$80k-$120k",
    date: "June 10, 2025",
    applicants: "24",
    status: "Active",
  },
  {
    id: 6,
    title: "Backend Developer",
    company: "Amazon",
    location: "Remote / Hyderabad",
    salary: "$90k-$130k",
    date: "June 5, 2025",
    applicants: "18",
    status: "Active",
  },
  {
    id: 7,
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Bengaluru",
    salary: "$70k-$100k",
    date: "May 30, 2025",
    applicants: "32",
    status: "Closed",
  },
  {
    id: 8,
    title: "Full Stack Engineer",
    company: "Microsoft",
    location: "Remote",
    salary: "$100k-$140k",
    date: "June 1, 2025",
    applicants: "45",
    status: "Active",
  },
];

const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  const filteredJobs = dummyJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="job-listing">
      <p className="job-heading">
        Manage your posted jobs and view applicants easily
      </p>

      <div className="job-actions">
        <Link to="/profile" className="job-post-link">
          <button className="job-btn">+ Post a Job</button>
        </Link>
        <input
          type="search"
          placeholder="Search for job"
          className="job-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="job-grid">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              date={job.date}
              applicants={job.applicants}
              status={job.status}
            />
          ))
        ) : (
          <p style={{ padding: "2em", color: "#888" }}>No jobs found for "{searchTerm}"</p>
        )}
      </div>

       {/* Pagination Footer */}
      {totalJobs > jobsPerPage && (
        <div className="pagination-footer">
          <span>
            Showing {indexOfFirstJob + 1}–
            {Math.min(indexOfLastJob, totalJobs)} of {totalJobs} jobs
          </span>

          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default JobListing;
